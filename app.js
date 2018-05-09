'use strict';

let express = require('express');
let app = express();
let ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
let bodyParser = require('body-parser');

require('dotenv').config({silent: true});

// Create the service wrapper
let toneAnalyzer = new ToneAnalyzerV3({
  version_date: '2017-09-21',
});

app.use(bodyParser.json());

app.use(express.static('public'));

function createToneRequest (request) {
  let toneChatRequest;

  if (request.texts) {
    toneChatRequest = {utterances: []};

    for (let i in request.texts) {
      let utterance = {text: request.texts[i]};
      toneChatRequest.utterances.push(utterance);
    }
  }

  return toneChatRequest;
}

function happyOrUnhappy (response) {
  const happyTones = ['satisfied', 'excited', 'polite', 'sympathetic'];
  const unhappyTones = ['sad', 'frustrated', 'impolite'];

  let happyValue = 0;
  let unhappyValue = 0;

  for (let i in response.utterances_tone) {
    let utteranceTones = response.utterances_tone[i].tones;
    for (let j in utteranceTones) {
      if (happyTones.includes(utteranceTones[j].tone_id)) {
        happyValue = happyValue + utteranceTones[j].score;
      }
      if (unhappyTones.includes(utteranceTones[j].tone_id)) {
        unhappyValue = unhappyValue + utteranceTones[j].score;
      }
    }
  }
  if (happyValue >= unhappyValue) {
    return 'happy';
  }
  else {
    return 'unhappy';
  }
}

/* Example 
{
  "texts": ["I do not like what I see", "I like very much what you have said."]
}
*/
app.post('/tone', (req, res, next) => {
  let toneRequest = createToneRequest(req.body);

  if (toneRequest) {
    toneAnalyzer.toneChat(toneRequest, (err, response) => {
      if (err) {
        return next(err);
      }
      let answer = {mood: happyOrUnhappy(response)};
      return res.json(answer);
    });
  }
  else {
    return res.status(400).send({error: 'Invalid Input'});
  }
});

let port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.listen(port, () =>  {
  console.log('Server running on port: %d', port);
});

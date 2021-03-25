const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();
const fs = require('fs');

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-24',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let o_nlu = getNLUInstance();

    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'categories': {
                'limit': 3
            },
            'entities': {
            'emotion': true,
            'sentiment': true
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
            },
        },
        "language": "en"
    };

    o_nlu.analyze(analyzeParams)
    .then(analysisResults => {
        res.send(analysisResults.result.keywords[0].emotion);
    })
    .catch(err => {
        console.log('error1:', err);
    });
});

app.get("/url/sentiment", (req,res) => {
    let o_nlu = getNLUInstance();

    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'categories': {
                'limit': 3
            },
            'entities': {
            'emotion': true,
            'sentiment': true
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
            },
        },
        "language": "en"
    };


    o_nlu.analyze(analyzeParams)
    .then(analysisResults => {
        try {
            res.send(analysisResults.result.keywords[0].sentiment.label);
        }
        catch (TypeError) {
            res.send('neutral');
        }
    })
    .catch(err => {
        console.log('error2:', err);
    });
});

app.get("/text/emotion", (req,res) => {
    let o_nlu = getNLUInstance();

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'categories': {
                'limit': 3
            },
            'entities': {
            'emotion': true,
            'sentiment': true
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
            },
        },
        "language": "en"
    };

    o_nlu.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        res.send(analysisResults.result.keywords[0].emotion);
    })
    .catch(err => {
        console.log('error3:', err);
    });
});

app.get("/text/sentiment", (req,res) => {
    let o_nlu = getNLUInstance();

    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'categories': {
                'limit': 3
            },
            'entities': {
            'emotion': true,
            'sentiment': true
            },
            'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2,
            },
        },
        "language": "en"
    };

    o_nlu.analyze(analyzeParams)
    .then(analysisResults => {
        try {
            res.send(analysisResults.result.keywords[0].sentiment.label);
        }
        catch (TypeError) {
            res.send('neutral');
        }
    })
    .catch(err => {
        console.log('error4:', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})


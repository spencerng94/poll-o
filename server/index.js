const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(express.static('App.js'))
app.set('port', PORT)

// Get All Polls
app.get('/api/polls', (req, res) => {
    var getPolls = function() {
        return new Promise((resolve, reject) => {
            db.getPolls(resolve, reject);
        });
    };

    console.log('reached get req')

    getPolls().then((data) => {
        // console.log(data, "logging data from getPolls");
        res.status(200);
        res.send(data);
      }).catch((err) => {
        res.status(404).send({ error: 'Something failed!' })
        console.log(err, "error was reached :(");
      })
});

// Get All Options
app.get('/api/options', (req, res) => {
  var getOptions = function() {
      return new Promise((resolve, reject) => {
          db.getOptions(resolve, reject);
      });
  };

  console.log('reached get req')

  getOptions().then((data) => {
      console.log(data, "logging data from getOptions");
      res.status(200);
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Something failed!' })
      console.log(err, "error was reached :(");
    })
});

// Get All Options
app.get('/api/options/:id', (req, res) => {
  const { id } = req.params;
  console.log('DOES THIS WORK...', id);

  var getOptionsById = (id) => {
    return new Promise((resolve, reject) => {
      db.getOptionsById(resolve, reject, id);
    })
  }

  getOptionsById(id)
    .then(data => {
      res.status(200);
      res.send(data)
    })
    .catch(err => res.status(404).send({ error: err }));
  // var getOptions = function() {
  //     return new Promise((resolve, reject) => {
  //         db.getOptions(resolve, reject);
  //     });
  // };

  // console.log('reached get req')

  // getOptions().then((data) => {
  //     console.log(data, "logging data from getOptions");
  //     res.status(200);
  //     res.send(data);
  //   }).catch((err) => {
  //     res.status(404).send({ error: 'Something failed!' })
  //     console.log(err, "error was reached :(");
  //   })
});

// Get All Users
app.get('/api/users', (req, res) => {
  var getUsers = function() {
      return new Promise((resolve, reject) => {
          db.getUsers(resolve, reject);
      });
  };

  console.log('reached get req')

  getUsers().then((data) => {
      console.log(data, "logging data from getUsers");
      res.status(200);
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Something failed!' })
      console.log(err, "error was reached :(");
    })
});

// Create new User
app.post('/api/signup', (req, res) => {
    // console.log(req.body, 'logging req from app.post @@@@@@@@#@#@#@#@#@#@#')
    console.log('INSIDE SIGN UP.');
    let body = req.body;
    console.log(body);


    var postNewUser = function() {
        return new Promise((resolve, reject) => {
          db.userSignUp(body.userId, body.email, body.password, body.username, body.createdOn, resolve, reject);
        })
      }
      postNewUser().then((data) => {
        console.log(data, 'logging data from postNewUser pls work plzzz')
        res.status(200)
        res.send(data);
      }).catch((err) => {
        res.status(404).send({ error: 'Something failed!' })
        res.end();
        console.log(err, 'err from postNewUser')
      })

})

// Create new pollOption
app.post('/api/option', (req, res) => {
  // console.log(req.body, 'logging req from app.post @@@@@@@@#@#@#@#@#@#@#')
  // console.log('INSIDE POLL OPTION POST.');
  let body = req.body;
  console.log(body);


  var postNewOption = function() {
      return new Promise((resolve, reject) => {
          ////////// TODO: edit
        db.createOption(body.pollOptionId, body.text, body.pollId, body.voteCount, resolve, reject);
        ////////////
      })
    }
    postNewOption().then((data) => {
      // console.log(data, 'logging data from postNewOption pls work plzzz')
      res.status(200)
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Something failed!' })
      res.end();
      console.log(err, 'err from postNewOption')
    })

})


// Create new poll
app.post('/api/poll', (req, res) => {
  console.log('INSIDE POLL POST.');
  let body = req.body;
  console.log(body, 'logging poll body from server/index.js');


  var postNewPoll = function() {
      return new Promise((reject, resolve) => {
          ////////// TODO: edit
        db.createPoll(body.pollId, body.question, body.createdByUserId, body.categoryId, body.createdOn, resolve, reject);
        ////////////
      })
    }
    postNewPoll()
      .then((data) => {
      // console.log(data, 'logging data from postNewPoll pls work plzzz')
      res.status(200)
      res.send(data);
    }).catch((err) => {
      res.status(404).send({ error: 'Something failed!' })
      res.end();
      console.log(err, 'err from postNewPoll')
    })
})

app.patch('/api/options/:pollOptionId', (req, res) => {
  let body = req.body;
  console.log(body, 'logging poll body from server/index.js');

  var updateVoteCount = function() {
    return new Promise((reject, resolve) => {
        ////////// TODO: edit
      db.updateVote(reject, resolve, body.pollOptionId, body.voteCount);
      ////////////
    })
  }
  updateVoteCount()
  .then((data) => {
    // console.log(data, 'logging data from postNewPoll pls work plzzz')
    res.status(200)
    res.send(data);
  }).catch((err) => {
    res.status(404).send({ error: 'Something failed!' })
    res.end();
    console.log(err, 'err from updateVoteCount')
  })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
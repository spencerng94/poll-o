const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const userSignUp = function(userId, email, password, username, createdOn, resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
          console.log('successfully connected to db!')
      }
    });
  
    // need to put in full user data
    connection.query(`INSERT INTO users (userId, email, password, username, createdOn) VALUES (?, ?, ?, ?, ?)`, [userId, email, password, username, createdOn],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(results, 'logging results from connection.query')
        // return results;
        resolve(results);
      }
    });
  
    connection.end();
};

const createOption = function(pollOptionId, text, pollId, voteCount, resolve, reject) {
  const connection = mysql.createConnection(mysqlConfig);
  connection.connect(function(err) {
    if (err) {
      console.log(err);
      reject(err);
    } else {
        console.log('successfully connected to db!')
    }
  });

  // need to put in full user data
  connection.query(`INSERT INTO pollOptions (pollOptionId, text, pollId, voteCount) VALUES (?, ?, ?, ?)`, [pollOptionId, text, pollId, voteCount],
  function (error, results, fields) {
    if (error) {
      console.log(error, 'logging error from index.js/datavase/createOption');
      reject(error);
    } else {
      // console.log(results, 'logging results from connection.query')
      // return results;
      resolve(results);
    }
  });

  connection.end();
};

const createPoll = function(pollId, question, createdByUserId, categoryId, createdOn, resolve, reject) {
  const connection = mysql.createConnection(mysqlConfig);
  connection.connect(function(err) {
    if (err) {
      console.log(err);
      reject(err);
    } else {
        console.log('successfully connected to db!')
    }
  });

  // need to put in full user data
  connection.query(`INSERT INTO polls (pollId, question, createdByUserId, categoryId, createdOn) VALUES (?, ?, ?, ?, ?)`, [pollId, question, createdByUserId, categoryId, createdOn],
  function (error, results, fields) {
    if (error) {
      console.log(error);
      reject(error);
    } else {
      console.log(results, 'logging results from connection.query (createPoll)')
      // return results;
      resolve(results);
    }
  });

  connection.end();
};

const getUsers = function(resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  
    connection.query('SELECT * FROM users',
      function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results, 'logging results from connection.query')
          // return results;
          resolve(results);
        }
      });
  
    connection.end();
  };

const getPolls = function(resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  
    connection.query('SELECT * FROM polls',
      function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results, 'logging results from connection.query')
          // return results;
          resolve(results);
        }
      });
  
    connection.end();
  };

  const getOptions = function(resolve, reject) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect(function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }
    });
  
    connection.query('SELECT * FROM pollOptions',
      function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results, 'logging results from connection.query')
          // return results;
          resolve(results);
        }
      });
  
    connection.end();
  };

  const getOptionsById = function(resolve, reject, id){
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect((err) => {
      if(err) reject(err);
      console.log(id);
    })

    connection.query(`SELECT * FROM pollOptions WHERE pollId=${id}`,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(results, 'logging results from connection.query')
          // return results;
          resolve(results);
        }
      });
    connection.end();
  }

  const updateVote = function(reject, resolve, pollOptionId, voteCount) {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect((err) => {
      if(err) reject(err);
      console.log('pollOptionId:', pollOptionId, 'voteCount:', voteCount);
    })

    console.log('pollOptionId:', pollOptionId, 'voteCount:', voteCount);

    // connection.query('UPDATE pollOptions SET voteCount = ? WHERE pollOptionId= ?', [voteCount, pollOptionId],
    connection.query(`UPDATE pollOptions SET voteCount = ${voteCount} WHERE pollOptionId= ${pollOptionId}`,
      function (error, results, fields) {
        if (error) {
          console.log(error, 'logging error from updateVote');
          reject(error);
        } else {
          console.log(results, 'logging results from connection.query')
          resolve(results);
        }
      });
    connection.end();
  }
  
  
module.exports = {
   userSignUp, getUsers, getPolls, getOptions, createOption, createPoll, getOptionsById, updateVote
};
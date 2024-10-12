const express = require('express');

const router = express.Router();

const endPoint = '/messages';

// /messages
router
  .route(endPoint)
  .get((request, response) => {
    response.json({
      message: "called by the GET method"
    });
  })
  .post((request, response) => {
    response.json({
      message: "called by the POST method"
    });
  });

//  /messages/1
router
  .route(`${endPoint}/:id`)
  .get((request, response) => {
    response.json({
      message: `called by the GET method. ID: ${request.params.id}`
    });
  })
  .post((request, response) => {
    response.json({
      message: `called by the POST method. ID: ${request.params.id}`
    });
  })
  .delete((request, response) => {
    response.json({
      message: `called by the DELETE method. ID: ${request.params.id}`
    });
  });




module.exports = router;
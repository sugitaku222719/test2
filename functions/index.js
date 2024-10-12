/*
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express');
const messagesRouter = require('./routers/messages/route')
var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}); 

const app = express();
app.use('/', messagesRouter);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


exports.api = functions
  .region('asia-northeast1')
  .https
  .onRequest(app);
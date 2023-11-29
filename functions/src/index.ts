/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { GetUsersResult, UserRecord } from "firebase-admin/auth";
import { onCall, HttpsError } from "firebase-functions/v2/https";

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const { logger } = require("firebase-functions");
// const { onRequest } = require("firebase-functions/v2/https");
// const { onDocumentCreated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
// const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp();

exports.getUser = onCall((request) => {
  const { uid } = request.data;
  return getAuth(app)
    .getUser(uid)
    .then((userRecord: UserRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
      return userRecord.toJSON();
    })
    .catch((error: string) => {
      console.log("Error fetching user data:", error);
      throw new HttpsError("internal", error);
    });
});

exports.getUsers = onCall((request) => {
  const uids = request.data;
  const payload = uids.map((uid: string) => ({ uid }));

  return getAuth(app)
    .getUsers(payload)
    .then((result: GetUsersResult) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched users data: ${result}`);
      return result.users.map((user) => user.toJSON());
    })
    .catch((error: string) => {
      console.log("Error fetching user data:", error);
      throw new HttpsError("internal", error);
    });
});

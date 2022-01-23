import express from "express";
import * as authCtrl from "./controllers/auth-ctrl.js";
import * as userCtrl from "./controllers/user-ctrl.js";
import * as adminCtrl from "./controllers/admin-ctrl.js";
import * as tsgCtrl from "./controllers/tsg-ctrl.js";
import * as societiesCtrl from "./controllers/societies-ctrl.js";
import * as newsCtrl from "./controllers/news-ctrl.js";
import * as quickInfoCtrl from "./controllers/quickInfo-ctrl.js";
import * as messagesCtrl from "./controllers/messages-ctrl.js";
import * as postsCtrl from "./controllers/posts-ctrl.js";
import * as notificationsCtrl from "./controllers/notifications-ctrl.js";
import * as achievementsCtrl from "./controllers/achievements-ctrl.js";

const Router = express.Router();

// Auth routes
Router.post("/auth/otp/generate", authCtrl.generateOTP);
Router.post("/auth/otp/verify", authCtrl.verifyOTP);
Router.post("/auth/admin/", authCtrl.adminAuth);
Router.get("/auth/token/:token", authCtrl.tokenAuth);
Router.get("/auth/adminToken/:adminToken", authCtrl.adminTokenAuth);

// User routes
Router.get("/user/get/:email", userCtrl.getUser);
Router.get("/users/get", userCtrl.getUsers);
Router.post("/user/post", userCtrl.postUser);
Router.patch("/user/patch", userCtrl.patchUser);

// Admin routes
Router.get("/admin/get/:email", adminCtrl.getAdmin);
Router.post("/admin/post", adminCtrl.postAdmin);

// TSG events routes
Router.get("/tsg/get", tsgCtrl.getTsgEvents);
Router.post("/tsg/post", tsgCtrl.postTsgEvent);
Router.patch("/tsg/patch", tsgCtrl.patchTsgEvent);
Router.delete("/tsg/delete/:_id", tsgCtrl.deleteTsgEvent);

// Societies' events routes
Router.get("/societies/get", societiesCtrl.getSocEvents);
Router.post("/societies/post", societiesCtrl.postSocEvent);
Router.patch("/societies/patch", societiesCtrl.patchSocEvent);
Router.delete("/societies/delete/:_id", societiesCtrl.deleteSocEvent);

// News routes
Router.get("/news/get", newsCtrl.getNews);
Router.post("/news/post", newsCtrl.postNews);
Router.patch("/news/patch", newsCtrl.patchNews);
Router.delete("/news/delete/:_id", newsCtrl.deleteNews);

// Quick Info routes
Router.get("/quickInfo/get", quickInfoCtrl.getQuickInfo);
Router.post("/quickInfo/post", quickInfoCtrl.postQuickInfo);
Router.patch("/quickInfo/patch", quickInfoCtrl.patchQuickInfo);
Router.delete("/quickInfo/delete/:_id", quickInfoCtrl.deleteQuickInfo);

// Messages routes
Router.get("/messages/get/:user", messagesCtrl.getMessages);
Router.post("/messages/post", messagesCtrl.postMessages);
Router.patch("/messages/patch", messagesCtrl.patchMessages);

// Posts routes
Router.get("/posts/get/:email", postsCtrl.getPosts);
Router.post("/posts/post", postsCtrl.postPost);

// Notifications routes
Router.get("/notifications/get/:name/:email", notificationsCtrl.getNotifications);
Router.post("/notifications/post", notificationsCtrl.postNotification);
Router.delete("/notifications/delete/:_id", notificationsCtrl.deleteNotification);

// Achievements routes
Router.get("/achievements/get/:email", achievementsCtrl.getAchievements);
Router.post("/achievements/post", achievementsCtrl.postAchievement);
Router.patch("/achievements/patch", achievementsCtrl.patchAchievement);
Router.delete("/achievements/delete/:_id", achievementsCtrl.deleteAchievement);

export default Router;
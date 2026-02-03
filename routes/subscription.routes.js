import { Router } from 'express';
import authorize from "../middlewares/auth.middleware.js";
import {
    createSubscription,
    getUserSubscription
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, (req, res) =>
    res.send({ title: 'Get all Subscriptions' })
);

subscriptionRouter.get('/upcoming-renewals', authorize, (req, res) =>
    res.send({ title: 'Get all Subscriptions' })
);

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.get('/:id', authorize, (req, res) =>
    res.send({ title: 'Get Subscriptions Details' })
);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id/cancel', authorize, (req, res) =>
    res.send({ title: 'Cancel Subscriptions' })
);

subscriptionRouter.put('/:id', authorize, (req, res) =>
    res.send({ title: 'Update Subscriptions' })
);

subscriptionRouter.delete('/:id', authorize, (req, res) =>
    res.send({ title: 'Delete Subscriptions' })
);

export default subscriptionRouter;

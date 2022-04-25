const User = require('../models/User');
const Subscription = require('../models/Subscription');

const {
    NotFoundError,
    ConflictError,
    BadRequestError
} = require('../utils/errors');

const subscriptionController = {
    create: async function (userUUID, subscription) {
        console.log(`Creating new subscription for user with uuid ${userUUID}`);
        let user = await User.findOne({
            UUID: userUUID
        });
        if (!user) {
            throw new NotFoundError(`User with uuid ${userUUID} not found`);
        } else {
            let toCreate = await Subscription.findOne({
                UUID: {
                    $in: user.subscription
                }
            });
            if (toCreate) {
                throw new ConflictError(`Subscription with uuid ${userUUID} already exists`);
            } else {
                let newSubscription = await new Subscription(subscription);
                let savedSubscription = await newSubscription.save();
                user.subscription = savedSubscription.UUID;
                await user.save();
                return savedSubscription;
            }
        }
    },
    get: async function (subscriptionUUID) {
        console.log(`Searching for subscription with uuid ${subscriptionUUID}`);
        let subscription = await Subscription.findOne({
            UUID: subscriptionUUID
        });
        if (!subscription) {
            throw new NotFoundError(`Subscription with uuid ${subscriptionUUID} not found`);
        } else {
            return subscription;
        }
    },
    delete: async function (subscriptionUUID) {
        console.log(`Deleting subscription with uuid ${subscriptionUUID}`);
        let subscription = await Subscription.findOne({
            UUID: subscriptionUUID
        });
        if (!subscription) {
            throw new NotFoundError(`Subscription with uuid ${subscriptionUUID} not found`);
        } else {
            let user = await User.findOne({
                subscription: subscriptionUUID
            });
            user.subscription = "";
            await user.save();
            await subscription.remove();
            return subscription;
        }
    },
    update: async function (subscriptionUUID, subscription) {
        console.log(`Updating subscription with uuid ${subscriptionUUID}`);
        let toUpdate = await Subscription.findOne({
            UUID: subscriptionUUID
        });
        if (!toUpdate) {
            throw new NotFoundError(`Subscription with uuid ${subscriptionUUID} not found`);
        } else {
            try {
                for (let key in subscription) {
                    if (subscription.hasOwnProperty(key)) {
                        toUpdate[key] = subscription[key];
                    }
                }
                let savedSubscription = await toUpdate.save();
                return savedSubscription;
            } catch (err) {
                throw new BadRequestError(err.message);
            }
        }
    }
};

module.exports = subscriptionController;
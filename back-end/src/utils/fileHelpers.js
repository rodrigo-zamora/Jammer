const User = require('../models/User');
const List = require('../models/List');
const Movie = require('../models/Movie');
const Subscription = require('../models/Subscription');

function restoreList() {
    List.deleteOne({
        UUID: '77l38is2-t53s-4637-9c57-d8529cc02bc1'
    }, (err) => {
        if (err) {
            console.log('Error deleting list: ', err);
        } else {
            console.log('List deleted');
        }
    });
}

function restoreMovie() {
    let movieUUID = '77m38ov2-i53e-4637-9c57-d8529cc02bc1';
    Movie.deleteOne({
        UUID: movieUUID
    }, (err) => {
        if (err) {
            console.log('Error deleting movie: ', err);
        } else {
            console.log('Movie deleted');
        }
    });
}

function restoreUser() {
    let list = {
        UUID: 'fe5afea7-5905-4935-bddf-48594fac4c46',
        name: 'Recently Watched',
        movies: [{
            movieUUID: '1937a756-f392-4218-b9db-8c078c8bfbc0',
            time: '5m'
        }],
        isShared: false,
        sharedWith: [],
        imageURL: ''
    };
    let subscription = {
        UUID: '77s38ub2-s53c-4637-9r57-i8529pt02ion',
        paymentUUID: '77p38ay2-m53e-4637-9n57-t8529pt02ion',
        subscriptionType: 'free'
    };
    backupUser = {
        UUID: '77f38fc2-c53f-4637-9c57-d8529cc02bc1',
        firstName: 'Rodrigo',
        lastName: 'Zamora',
        email: 'rodrigo.zamora@hotmail.com',
        password: '123456',
        lists: [list.UUID],
        subscription: subscription.UUID,
        createdAt: Date.parse('2022-03-27T23:03:13.652+00:00'),
        updatedAt: Date.parse('2022-03-28T02:16:03.133+00:00')
    };
    User.create(backupUser, (err, newUser) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Restored user: ', newUser);
        }
    });
    Subscription.create(subscription, (err, subscription) => {
        if (err) {
            console.log('Error creating subscription: ', err);
        } else {
            console.log('Subscription created: ', subscription);
        }
    });
    List.create(list, (err, newList) => {
        if (err) {
            console.log(err);
        } else {
            backupUser.lists.push(newList.UUID);
        }
    });
    User.deleteOne({
        email: 'miriam.malta@hotmail.com'
    }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Deleted user: ', user);
        }
    });
    Subscription.deleteOne({
        UUID: ('77s38ub2-s53c-4637-9r57-i8529pt02ion' + 'new')
    }, (err, subscription) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Deleted subscription: ', subscription);
        }
    });
}

module.exports = {
    restoreUser,
    restoreMovie,
    restoreList
};
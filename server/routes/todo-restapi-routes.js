/****
 *
 * Mounted at [siteroot]/api
 * Thus, routes defined below as e.g. /bears are going to /api/bears
 *
 */

//Build a new router object
var Busboy = require('busboy');
var log = require('server/debug/winston-logger');

var async = require('async');
var _ = require('lodash');

var express = require('express');
var restRouter = express.Router();

var bodyParser = require('body-parser');

var config = require('config/default');

//Redis setup
var Redis = require('redis');
var db = Redis.createClient(config.redis.port, config.redis.host, config.redis.options);

console.log(db);

/***************************************************************************************************
*
*       SET AND GET VALUES FROM REDIS DB
*
*/
var setBearType = function setBearType(bearType, next){
    console.log('SBT - 003 - In setBearType! bearType: ' + bearType);
    return db.set('bearType', bearType, function handleSetBearTypeDbRes(err, replies){
        console.log('SBT-INNER - 004 - In handleSetBearTypeDbRes! Db reply: ' + replies);
        return (err)
            ? next(err)
            : next(null, replies);
    });
};

var setBearFood = function setBearFood(bearFood, next){
    console.log('SBF - 007 - In setBearFood! bearFood: ' + bearFood);
    return db.set('bearFood', bearFood, function handleSetBearFoodDbRes(err, replies){
        console.log('SBT-INNER - 008 - In handleSetBearFoodDbRes! Db reply: ' + replies);
        return (err)
            ? next(err)
            : next(null, replies);
    });
};

var getBearType = function getBearType(next) {
    console.log('In getBearType!');
    return db.get('bearType', function handleGetBearTypeDbRes(err, reply){
        console.log('In handleGetBearTypeDbRes! Db reply: ' + reply);
        return (err)
            ? next(err)
            : next(null, reply);
    });
};

var getBearFood = function getBearFood(next) {
    console.log('In getBearFood!');
    return db.get('bearFood', function handleGetBearFoodDbRes(err, reply){
        console.log('In handleGetBearFoodDbRes! Db reply: ' + reply);
        return (err)
            ? next(err)
            : next(null, reply);
    });
};
/**************************************************************************************************/




//------------------------------------------------------------------------------------------------//
//________________________________________________________________________________________________//
/***************************************************************************************************
*
*       RESTAPI ROUTES below
*
*/
restRouter
    .get('/', function restRouter_base_get(req, res){
        res.json({apiAccessed: true, protocol: 'GET', msg: 'welcome to our api!'});
        res.end();
    })
    .post('/', function restRouter_base_post(req, res){
        res.json({apiAccessed: true, protocol: 'POST', msg: 'welcome to our api!'});
        res.end();
    });



/***************************************************************************************************
*
*       /puppies routes
*
*/
restRouter
    .use(bodyParser.urlencoded({ extended: false }))
    .post('/puppies', function restAPIRoutePuppiesPost(req, res){
        console.dir(req.body);
        res.json({
            apiAccessed: true,
            protocol: 'POST',
            msg: 'welcome to our api - 3. Via POST!',
            req: req.body
        });
        res.end();
    })
    .get('/puppies', function restAPIRoutePuppiesGet(req, res){
        console.log('took the puppies in!');
        console.dir(req, { depth: 10 });
        res.json({apiAccessed: true, protocol: 'GET', msg: 'welcome to our api - 2!'});
        res.end();
    });
/**************************************************************************************************/

var handleSetBearData = function handleSetBearData(req, res, next){
    console.log('001 - ENTERED handleSetBearData');
    return async.parallel([
        function bearRoute_P1(callback) {
            console.log('P1 - 002 - bearRoute_P1::IN!');
            setBearType(req.bearType, function(err, bearType){
                console.log('P1.1 - 005 - bearRoute_P1::setBearType::IN!');
                return (err)
                    ? callback(err)
                    : callback(null, bearType);
            });
        },
        function bearRoute_P2(callback) {
            console.log('P2 - 006 - bearRoute_P2::IN!');
            setBearFood(req.bearFood, function(err, bearFood){
                console.log('P2.1 - 009 - bearRoute_P1::setBearFood::IN!');
                return (err)
                    ? callback(err)
                    : callback(null, bearFood);
            });
        }
    ],
    function bearRoute_P_FINAL(err, results) {
        console.log('P_F_3 - 010 - bearRoute_P_FINAL::IN!');
        return (err)
            ? next(err)
            : next(null, results);
    });
};

var handleGetBearData = function handleGetBearData(next){
    console.log('001 - ENTERED handleGetBearData');
    return async.parallel([

        function bearGetInfoRoute_P1(callback) {
            console.log('P1 - 002 - bearGetInfoRoute_P1::IN!');
            getBearType(function handleGetBearTypeResp_P1_1(err, bearType){
                console.log('P1.1 - 005 - handleGetBearTypeResp_P1_1::getBearType::IN!');
                return (err)
                    ? callback(err)
                    : callback(null, {bearType: bearType});
            });
        },

        function bearGetInfoRoute_P2(callback) {
            console.log('P2 - 006 - bearGetInfoRoute_P2::IN!');
            getBearFood(function handleGetBearTypeResp_P2_1(err, bearFood){
                console.log('P2.1 - 009 - handleGetBearFoodResp_P2_1::getBearFood::IN!');
                return (err)
                    ? callback(err)
                    : callback(null, {bearFood: bearFood});
            });
        }


    ], function bearRoute_getInfo_P_FINAL(err, results){
        console.log('P_F_3 - 010 - bearRoute_getInfo_P_FINAL::IN!');
        return (err)
            ? next(err)
            : next(null, results);
    });
};

/***************************************************************************************************
*
*       /bears route; and /bears/muchbears routes
*
*/
restRouter
    .post('/bears', function restAPIRouteBearsPost(req, res){
        res.json({apiAccessed: true, protocol: 'POST', msg: 'welcome to our api - 2!'});
        res.end();
    });


restRouter
    .use(bodyParser.urlencoded({ extended: false }))

    .post('/bears/muchbears', function restAPIRouteMuchBearsPost(req, res){
        handleSetBearData(req.body, res, function endBearsMuchBearsRouteHandling(err, results){
            console.log('POST - 011 - Back from handleSetBearData!');
            if (err) throw new Error('failed at handleSetBearData, with error: ' + err);
            console.dir(req.body);
            res.json({
                apiAccessed: true,
                protocol: 'POST',
                msg: 'welcome to our api - 3. Via POST!',
                req: req.body
            });
            res.end();
        });
    })

    .get('/bears/muchbears', function restAPIRouteMuchBearsGet(req, res){
        console.log('took the bears in!');
        console.dir(req, { depth: 10 });
        res.json({apiAccessed: true, protocol: 'GET', msg: 'welcome to our api - 2!'});
        res.end();
    })

    .post('/bears/get-bear-info', function restAPIRouteMuchBearsPost(req, res){
        handleGetBearData(function endBearsMuchBearsRouteHandling(err, results){
            console.log('POST - 011 - Back from handleGetBearData!');
            if (err) throw new Error('failed at handleGetBearData, with error: ' + err);
            console.dir(req.body);
            res.json(_.merge({
                'apiAccessed': true,
                'protocol': 'POST',
                'redisRequestStatus': 'SUCCESSFUL'
            }, results[0], results[1]));
            res.end();
        });
    })

    .get('/bears/get-bear-info', function restAPIRouteMuchBearsGet(req, res){
        handleGetBearData(function endBearsMuchBearsRouteHandling(err, results){
            console.log('POST - 011 - Back from handleGetBearData! Results: '+ results);
            console.dir(results[0]);
            console.dir(results[1]);
            if (err) throw new Error('failed at handleGetBearData, with error: ' + err);
            console.dir(req.body);
            var outJSON = _.merge({
                'apiAccessed': true,
                'protocol': 'POST',
                'redisRequestStatus': 'SUCCESSFUL'
            }, results[0], results[1]);
            console.log(outJSON);
            res.json(outJSON);
            res.end();
        });
    });
/**************************************************************************************************/


//Output new router object, for use by the app.
module.exports = restRouter;
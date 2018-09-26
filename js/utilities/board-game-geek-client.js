"use strict";

const baseUrl = "https://www.boardgamegeek.com/xmlapi2/";
const parser = require("fast-xml-parser");
const queryString = require("query-string");

const getCollection = (username) => {
    const path = "/collection";
    const params = { username: username };

    return get(path, params);
}

const getGames = (gameIds) => {
    const ids = Array.isArray(gameIds) ? gameIds : [gameIds];
    const path = "/thing";
    const params = { id: ids.join(",") };

    return get(path, params);
}

const get = (path, params) => {
    const queryString = buildQuerySting(params);
    const url = baseUrl + path + "?" + queryString;

    return (
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/xml"
            }
        })
        .then(response => response.text())
        .then(xml => parser.parse(xml, { ignoreAttributes: false, attributeNamePrefix: '' }))
        .then(response => extractGames(response))
    );
}

const extractGames = (response) => {
    let games = response.items.item
    games = Array.isArray(games) ? games : [games];

    return games.map(({ name, ...gameAttrs }) => {
        const gameName = name[0] ? name[0].value : name["#text"];

        return({
            name: gameName,
            ...gameAttrs
        })
    });
}

const buildQuerySting = (object) => {
    return queryString.stringify(object);
}

module.exports = {
    getCollection: getCollection,
    getGames: getGames
}
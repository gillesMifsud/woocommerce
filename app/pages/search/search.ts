import {NavController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Component, Inject} from '@angular/core'

@Component({
    templateUrl: 'build/pages/search/search.html',
})

export class SearchPage {
    keyword:string;
    results = [];
    http;

    // @Inject(Http) httpService = httpService:Http (autre maniere d'ecrire)
    constructor(public nav:NavController, public httpService:Http) {
        this.nav = nav;
        this.http = httpService;
        this.results = this.getResults();
        this.keyword = '';
    }

    userPressedCancel() {
        this.results = this.getResults();
        this.keyword = '';
    }

    keyHasBeenPressed(e) {
        if (e.keyIdentifier === 'Enter') {
            this.http.get('https://redapesolutions.com/itunes?term='+this.keyword)
            .subscribe((response) => {
              this.results = response.json().results
            });
        }
    }

    getResults() {
        return [
            {
                "wrapperType": "track",
                "kind": "song",
                "artistId": 909253,
                "collectionId": 879273552,
                "trackId": 879273565,
                "artistName": "Jack Johnson",
                "collectionName": "In Between Dreams",
                "trackName": "Better Together",
                "collectionCensoredName": "In Between Dreams",
                "trackCensoredName": "Better Together",
                "artistViewUrl": "https://itunes.apple.com/us/artist/jack-johnson/id909253?uo=4",
                "collectionViewUrl": "https://itunes.apple.com/us/album/better-together/id879273552?i=879273565&uo=4",
                "trackViewUrl": "https://itunes.apple.com/us/album/better-together/id879273552?i=879273565&uo=4",
                "previewUrl": "http://a898.phobos.apple.com/us/r1000/039/Music6/v4/13/22/67/1322678b-e40d-fb4d-8d9b-3268fe03b000/mzaf_8818596367816221008.plus.aac.p.m4a",
                "artworkUrl30": "http://is3.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/30x30bb.jpg",
                "artworkUrl60": "http://is3.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/60x60bb.jpg",
                "artworkUrl100": "http://is3.mzstatic.com/image/thumb/Music2/v4/a2/66/32/a2663205-663c-8301-eec7-57937c2d0878/source/100x100bb.jpg",
                "collectionPrice": 8.99,
                "trackPrice": 1.29,
                "releaseDate": "2014-05-27T07:00:00Z",
                "collectionExplicitness": "notExplicit",
                "trackExplicitness": "notExplicit",
                "discCount": 1,
                "discNumber": 1,
                "trackCount": 15,
                "trackNumber": 1,
                "trackTimeMillis": 207679,
                "country": "USA",
                "currency": "USD",
                "primaryGenreName": "Rock",
                "isStreamable": true
            },
            {
                "wrapperType": "track",
                "kind": "song",
                "artistId": 909253,
                "collectionId": 879269460,
                "trackId": 879269461,
                "artistName": "Jack Johnson",
                "collectionName": "Jack Johnson and Friends: Sing-A-Longs and Lullabies For the Film Curious George",
                "trackName": "Upside Down",
                "collectionCensoredName": "Jack Johnson and Friends: Sing-A-Longs and Lullabies For the Film Curious George",
                "trackCensoredName": "Upside Down",
                "artistViewUrl": "https://itunes.apple.com/us/artist/jack-johnson/id909253?uo=4",
                "collectionViewUrl": "https://itunes.apple.com/us/album/upside-down/id879269460?i=879269461&uo=4",
                "trackViewUrl": "https://itunes.apple.com/us/album/upside-down/id879269460?i=879269461&uo=4",
                "previewUrl": "http://a1452.phobos.apple.com/us/r1000/030/Music4/v4/3c/a5/1a/3ca51a7a-768f-5f56-f3a0-35a62b02da43/mzaf_8754338071729397064.plus.aac.p.m4a",
                "artworkUrl30": "http://is4.mzstatic.com/image/thumb/Music/v4/19/32/e5/1932e5d6-0ec5-0237-6be9-f6fffd80e85c/source/30x30bb.jpg",
                "artworkUrl60": "http://is4.mzstatic.com/image/thumb/Music/v4/19/32/e5/1932e5d6-0ec5-0237-6be9-f6fffd80e85c/source/60x60bb.jpg",
                "artworkUrl100": "http://is4.mzstatic.com/image/thumb/Music/v4/19/32/e5/1932e5d6-0ec5-0237-6be9-f6fffd80e85c/source/100x100bb.jpg",
                "collectionPrice": 8.99,
                "trackPrice": 1.29,
                "releaseDate": "2014-05-27T07:00:00Z",
                "collectionExplicitness": "notExplicit",
                "trackExplicitness": "notExplicit",
                "discCount": 1,
                "discNumber": 1,
                "trackCount": 14,
                "trackNumber": 1,
                "trackTimeMillis": 208643,
                "country": "USA",
                "currency": "USD",
                "primaryGenreName": "Rock",
                "isStreamable": true
            },
          ]
    }
}

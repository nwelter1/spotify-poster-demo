// Declarations for our song values
let song;
let playSong;


//Spotify Creds - Add in from Spotify API Dev Dashboard

const clientId = ''; 
const clientSecret = '';

// Getting token from Spotify using our credentials
// Following Auth Guide Docs

const _getToken = async () => {
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    // Access the data given to us by fetch response (Promise)
    const data = await result.json();
    console.log(data)
    return data.access_token
}


// Function to get Song info when an image fig is clicked

/**
 * @param img_index
 * @param item_index
 * 
 * 
 * Function gets song from spotify using the image index of our gallery.
 * Then finds the correct item_index insdie of the JSON response data from the Spotify API
 * which will produce a preview URL that will be used to play song from movie soundtrack
 */
async function clickedEvent(img_index, item_index){
    //Get Track Name
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;

    // Get Token
    let token = await _getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{
        method: 'GET',
        headers: headers
    });

    let result = await fetch(request);

    let response = await result.json()

    console.log(response)
    let song = response.tracks.items[item_index].preview_url
    console.log(song)

    // Before we play a song, first check to so see if songPlaying is true -- if so, pause that before playing next
    if (playSong){
        stopSnippet();
    }
    songSnippet(song);
}


/**
 * 
 * @param id
 * @param event
 * 
 * id = image id for gallery image
 * event = Mouse event given by the action of the user
 * 
 * Function produces songs from the clickedEvent based
 * on index of image
 */

const getSong = (id,event) =>{
    switch(id){
        case 'fig1': {
            event.stopPropagation();
            clickedEvent(0,1)
            break;
        }
        case 'fig2': {
            event.stopPropagation();
            clickedEvent(1,3)
            break;
        }
        case 'fig3': {
            event.stopPropagation();
            clickedEvent(2,3)
            break;
        }
        case 'fig4': {
            event.stopPropagation();
            clickedEvent(3,1)
            break;
        }
        case 'fig5': {
            event.stopPropagation();
            clickedEvent(4,0)
            break;
        }
        case 'fig6': {
            event.stopPropagation();
            clickedEvent(5,1)
            break;
        }
    }
}

/**
 * @param url
 * 
 * url = song preview url
 * 
 * Function will return an audio clip given by the preview url
 */

function songSnippet(url){
    playSong = new Audio(url);
    return playSong.play()
}

/**
 * NO PARAMS
 * 
 * Function returns event to stop snippet
 */
function stopSnippet(){
    return playSong.pause();
}

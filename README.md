# PelisTime-Mobile
Versión móvil de [PelisTime](https://github.com/ghondar/PelisTime) creado con react-native, redux y react-native-material-design, basándome en el boilerplate [example-react-native-redux](https://github.com/alinz/example-react-native-redux).

![](https://media.giphy.com/media/3oGRFluL1njF4DBjlm/giphy.gif)

- [x] Search
- [x] List
- [x] Filters
- [x] Series
- [x] Torrent download and streaming
- [x] Player

## Setup
```shell
$ git clone https://github.com/ghondar/PelisTime-Mobile.git
$ cd PelisTime-Mobile
$ npm install
$ npm run clear
```
## Configure vlc library

Download file [here](https://github.com/ghondar/react-native-vlc-player/raw/master/android/libvlc/libvlc.aar)

And put libvlc.aar on `node_modules/react-native-vlc-player/android/libvlc`

## How to run:

run react-native server:

```shell
$ react-native start
```

and on another terminal:

```shell
$ react-native run-android
```

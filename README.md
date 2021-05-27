# Twitch Danmaku Overlay

Stream twitch chat to OBS in danmaku (bullet) format

## OBS Setup

For convenience, we're hosting this on our site at <https://teampoolsi.de/danmaku>.
To use this with OBS, simply add a new browser source and point it to this URL (see configuration options below).

You can also clone this repository and host it locally using `npx serve` or similar.

### Configuration

To configure the behaviour of the overlay, the following URL parameters are supported:

| Parameter   | Required? | Default value | Units   | Description                                                                    |
| ----------- | --------- | ------------- | ------- | ------------------------------------------------------------------------------ |
| channel     | yes       |               |         | the channel whose chat you want to display (usually your own)                  |
| minDuration | no        | 5             | seconds | the minimum amount of time it should take a bullet message to cross the screen |
| maxDuration | no        | 10            | seconds | the maximum amount of time it should take a bullet message to cross the screen |
| top         | no        | 0             | CSS %   | the highest position on screen any bullet message should appear                |
| bottom      | no        | 95            | CSS %   | the lowest position on screen any bullet message should appear                 |

### Examples

display <https://twitch.tv/teampoolsidotde> chat with default settings:

```
https://teampoolsi.de/danmaku?channel=teampoolsidotde
```

make messages take between 2 and 5 seconds to cross the screen:

```
https://teampoolsi.de/danmaku?channel=teampoolsidotde&minDuration=2&maxDuration=5
```

make messages appear between 15% and 85% of screen height:

```
https://teampoolsi.de/danmaku?channel=teampoolsidotde&top=15&bottom=85
```
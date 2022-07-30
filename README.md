# Subscription Generator

Generate a constant subscription for v2ray from subscription URLs changed in certain patterns.

## Installation

If you manage your package by `yarn`, using

```
yarn install
yarn start
```

else, using

```
npm install
npm start
```

to install the dependencies and then run it.

The default port is `3000`, and you can change it by argument `--port`.

```
yarn start --port [port]
```

## Usage

### Time-based scheme

For the urls of the source generated from date, use `/DateType?baseUrl=[baseUrl]&scheme=[scheme]&extension=[extension]`.

```
baseUrl     constant part of the URLs
scheme      variable part in date
            you can seperate multiple parts using a '/'

            Formats:

            yymmdd
            YYYYmmdd
            yymm
            YYYYmm

extension   if the file has an extension name
```

**Eg.** To get a subscrible-able link of `https://example.com/foo/bar/197001/19700101.txt`, you can use `/DateType?baseUrl=https://example.com/foo/bar&scheme=YYYYmm/YYYYmmdd&extension=txt`.

### File URL Scheme

Some provider will distribute their subscription on a certain web page, forcing you to visit its site regularly. To get a constant subscription link, use `FileType?baseUrl=[baseUrl]&selector=[selector]`.

```
baseUrl     constant web page
selector    CSS selector to the element contains the URL
```

**Eg.** To get the file URL in element `.foo > bar`, you can use `FileType?baseUrl=https://example.com/foo.html&selector=.foo>bar`.

# License

This program is under LGPLv3 license. 
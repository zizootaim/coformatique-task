# GuesBook-App

GuesBook App with Vue Js for Frontend and JSON-Server for Backend to store and send data .

## Demo

[![Watch the video]](https://drive.google.com/file/d/1_JdrLz3DCMMnQUeCBjHIJrECOmkxvycv/view)

## How to Run the Project

### Install Dependencies

```sh
npm install
```
### Start Backend Server

```sh
npm run json-server
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## To Improve the Exciting Code

1- Store Data in a Database instead of JSON-Server .

2- Improve the UI of message container .

3- Confirm the user when Deleting a message .

4- Add Some Animations .

## Design Decisions

I have built a simple design based on some examples from social media platforms .

## Documentation

First the user have to Sign Up to have an account on GuestBook App .

After Signing In with correct email and password , the user will be able to write , edit ,delete his own messages and reply to others .

The user cannot edit or delete others messages .

### How to Write a Message :

-Write your Message in the Textarea whose label is "Write Message".

-Click on the "Write Message" Button below the Textarea .

### How to Edit a Message :

-Click on the Edit Icon below the Message Content on the left side .

-Edit Your Message in the Textarea then Click the "ُEdit Message" Button .

### How to reply to a Message :

-Click the Reply Icon below the Message Content .

-Write Your Reply then Press Enter Key .

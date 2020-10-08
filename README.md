# Recapture App

## Features

- 1 image with a caption to represent a day or a memory
- Connect to S3 bucket
- Meant to complement photo management, I'm using Transmit and uploading photos to S3 with specific naming convention
- Super fast and light weight
- Receive reminder emails every 3 days to talk about new image, will just pick a random image from an S3 bucket
- Location automatically opens up in Google Maps

## Demo

![](https://harrisons-shared-images.s3.ap-southeast-2.amazonaws.com/screen_cast_recapture.gif)

The user starts on the index page for all images. This page lists images in descending order based on date. They then click on a date link and navigate to the show image page. This page displays the image itself, the date and a description.

The user then clicks on the add image button that takes them to the new image page. The important part here is the file name you pass. For me, this is a file name that exists in my S3 bucket that I've added via Transmit.

## Stack

- React
- Ruby on Rails

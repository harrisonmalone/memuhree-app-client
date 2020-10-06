# Recapture App

## Features

- 1 image with a caption to represent a day or a memory
- Connect to S3 bucket
- Meant to complement photo management, I'm using Transmit and uploading photos to S3 with specific naming convention
- Super fast and light weight
- Receive reminder emails every 3 days to talk about new image, will just pick a random image from an S3 bucket
- Location automatically opens up in Google Maps

## Screenshots

![](https://harrisons-shared-images.s3.ap-southeast-2.amazonaws.com/eaf5b23e872a6832d5ca.png)

The show image page. This is the most important page that displays an image I've taken the date and some kind of description.

![](https://harrisons-shared-images.s3.ap-southeast-2.amazonaws.com/14c3020c2685be764567.png)

The index page for all images. This page lists images in descending order based on date.

![](https://harrisons-shared-images.s3.ap-southeast-2.amazonaws.com/4ab1f8885f9ccea9b73b.png)

The new image page. The important part here is the file you pass. For me, this is a file name that exists in my S3 bucket that I've added via Transmit.

## Stack

- React
- Ruby on Rails

# PWR Explorer

## Description

Explorer for the PWR Chain.
Inspect blocks, transactions, and addresses on the PWR Chain.

## Setup and Installation

1. Clone the repository: `git clone https://github.com/pwrlabs/PWR-Explorer`
2. Navigate to the project directory: `cd PWR-Explorer`
3. Install the dependencies: `npm i`
4. Copy the `example.env` file and create a new `.env` file: `cp example.env .env`

## Branches

-   `main`: this is the production branch for the project, DO NOT PUSH TO THIS BRANCH
-   `develop`: the development branch for the project

### workflow

Please always use [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=%C2%BFQu%C3%A9%20es%20Gitflow%3F,vez%20y%20quien%20lo%20populariz%C3%B3.) to create new branches and merge them into dev branch. The main branch is protected and can only be merged into by pull requests.

## Environment Variables

This project requires the following environment variables to be set in the `.env` file:

-   `NEXT_PUBLIC_FONTAWESOME_KEY`: key for Font Awesome
-   `NEXT_PUBLIC_API_URL`: URL for the PWR Chain API

Please replace the placeholders in the `.env` file with your actual values.

## Running the Project

To run the project, use the following command: `npm run dev`

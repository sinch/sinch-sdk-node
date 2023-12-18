# Integrated flows with the Sinch Node.js SDK

This directory contains some code samples to illustrate how to chain services supported in the Sinch Node.js SDK.

## Prerequisites

Before trying to run a sample, make sure you have Node.js installed: please download and install the LTS version from [nodejs.org](https://nodejs.org).

Once installed, check you can run node with the following command:

```bash
node --version
```

You should see a result such as `v20.10.0`, matching the LTS you have downloaded or the version you had previously installed.

To use the Sinch Node.js SDK packages, you will need a package manager such as `NPM` (already installed with Node.js) or `yarn`.

To install `yarn` (optional), run the following command:

```bash
npm install --global yarn
```

## Configuration

To be able to send requests to the Sinch APIs, you need to have a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

With the credentials found on the Sinch dashboards, you will have to fill the file `.env.template` and **rename it to `.env`**. This file needs to be located at the same place where you will be executing the sample applications.

```properties
# Credentials for APIs using OAuth2 authentication
PROJECT_ID=project-id found at https://dashboard.sinch.com/account/access-keys
KEY_ID=access-key-id found at https://dashboard.sinch.com/account/access-keys
KEY_SECRET=access-key-secret found at access-key creation time
```

**Note**: If you prefer using environment variables, the sample app is also supporting them: they take precedence over the value from the `.env` file.

## Execution
You will find all the scripts in the `package.json` file to run the samples.

### With NPM

```bash
npm run numbers:app
```

### With Yarn

```bash
yarn run numbers:app
```

## Available flows

### Numbers

This app will try to rent a number or type `LOCAL` and manage it. the following requests will be chained:
 - the first request will return all the regions where we can rent a number of type `LOCAL`. We will store one of the values from the response.
 - Now that we have a region, we list all the numbers of type `LOCAL` available for rental in this region.
 - From the list of available numbers in the response, we select one, and we send another request to rent it
 - *Alternative*: renting a number can be done in only one step with the `rentAny` method. The application will rent a second number with this method.
 - Once a number is rented, it becomes an "active" number. 
   - A possibility to check is a number belongs to us, is to request it in the "active" domain
   - Another possibility is to list our active numbers and check if the numbers we have rented are part of the list. This example illustrates the pagination.
 - The next request will update some properties of our numbers
 - Finally, we will release our numbers to not be charged for more than 1 month.

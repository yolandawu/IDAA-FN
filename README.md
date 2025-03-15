# Intelligent Digital Assets Assistant (IDAA)

A frontend project of IDAA, an intelligent chatbot, specialized exclusively in cryptocurrency questions.  

Backend service code is hosted at [AdityaNikhil/IDAA](https://github.com/AdityaNikhil/IDAA).

This is our Capstone Project at **[Northeastern University](https://www.northeastern.edu/)**, program in **[Applied Machine Intelligence](https://cps.northeastern.edu/program/master-of-professional-studies-in-applied-machine-intelligence-boston/)**.

## Demo
_(Demo coming soon)_

## Features

- **Educator**: Learn fundamental concepts and advanced cryptocurrency topics.
- **Analyst**: Access real-time and historical cryptocurrency data analysis.
- **Supervisor**: Monitor trends and track market movements easily.

---

## Installation

Clone the repository
```bash
git clone https://github.com/yolandawu/IDAA-FN.git
cd IDAA-FN
npm install
```
Backend repository hosted **[here](https://github.com/AdityaNikhil/IDAA)**

## Usage

Adjust the backend API URL by editing the `.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

Start the development server:
```bash
npm run dev
```
Then open your browser and visit:
<http://localhost:3000>

## Deployment
### Build Static Files
```bash
npm run build
```
Your production-ready files will be located in the `out` directory.

To preview the production build locally, run:
```bash
cd out
python -m http.server 3000
```
Visit <http://localhost:3000>


## Deploy to AWS S3 (Static Hosting)
1. Create and Configure S3 Bucket
2. Upload the contents of the `out` folder to your S3 bucket.
3. (Optional but Recommended) AWS CloudFront
read more official document on **[aws]([https://eff.org](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html))**. 

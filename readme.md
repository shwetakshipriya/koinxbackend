
# Project Title
# 🚀 Koinx API

Keeping an eye on the crypto market has never been easier! This Node.js application fetches and serves up-to-date cryptocurrency data for Bitcoin, Ethereum, and Matic.

## 🌟 Features

- 🕒 Background job fetches crypto data every 2 hours
- 📊 /stats endpoint for latest cryptocurrency stats
- 📈 /deviation endpoint for price standard deviation
- 📚 Swagger documentation at /api-docs
- 🎮 API playground for easy testing

## 🛠️ Tech Stack

- Node.js & Express
- MongoDB Atlas
- node-cron
- Swagger UI

## 📡 API Endpoints

- GET /stats?coin=bitcoin - Get latest stats for a cryptocurrency
- GET /deviation?coin=bitcoin - Get price standard deviation for a cryptocurrency

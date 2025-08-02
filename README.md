# Digital Wallet API 💰

A secure, modular, and role-based backend API for a digital wallet system similar to Bkash or Nagad, built with Express.js and Mongoose.

## 🎯 Project Overview

This digital wallet system allows users to register, manage wallets, and perform core financial operations such as adding money, withdrawing, and sending money to other users. The system supports three distinct roles with different permissions and capabilities.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (Admin, User, Agent)
- Secure password hashing with bcrypt
- Protected routes with middleware

### 🏦 Wallet Management
- Automatic wallet creation during registration
- Initial balance of ৳50 for new users
- Wallet blocking/unblocking capabilities
- Balance tracking and management

### 💸 Transaction System
- Add Money (Top-up)
- Withdraw Money
- Send Money (P2P Transfer)
- Cash-In (Agent to User)
- Cash-Out (User to Agent)
- Complete transaction history

### 👥 Role-Based Features

#### 👤 User Features
- ✅ Register and login
- ✅ Add money to wallet (top-up)
- ✅ Withdraw money from wallet
- ✅ Send money to other users
- ✅ View personal transaction history
- ✅ View wallet balance

#### 🏪 Agent Features
- ✅ Register and await approval
- ✅ Cash-in to any user's wallet
- ✅ Cash-out from any user's wallet

#### 👨‍💼 Admin Features
- ✅ View all users, agents, wallets, and transactions
- ✅ Block/unblock user wallets
- ✅ System monitoring and management

## 🛠️ Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Validation:** Zod
- **Language:** TypeScript
- **Environment:** Node.js

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.routes.ts
│   │   ├── user.model.ts
│   │   └── user.interface.ts
        └── user.validation.ts
│   ├── wallet/
│   │   ├── wallet.controller.ts
│   │   ├── wallet.service.ts
│   │   ├── wallet.routes.ts
│   │   ├── wallet.model.ts
│   │   └── wallet.interface.ts
│   └── transaction/
│       ├── transaction.controller.ts
│       ├── transaction.service.ts
│       ├── transaction.routes.ts
│       ├── transaction.model.ts
│       └── transaction.interface.ts
├── middlewares/
│   ├── checkAuth.middleware.ts
│   ├── not.found.middleware.ts
│   └── validation.middleware.ts
├── config/
│   ├── env.ts
│   
├── utils/
│   ├── response.ts
│   └── jwt.ts
└── app.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd digital-wallet-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=XXXXXXXXXXXXX
   JWT_SECRET=XXXXXXXXXXXXX
   JWT_EXPIRES_IN=XXXXXXXXXXX
   BCRYPT_SALT_ROUNDS=XXXXXXXXXXX
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/user/register` | Register new user/agent | Admin |
| POST | `/auth/login` | User login | Public |


### User Management Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/user` | Get all users | Admin |



### Wallet Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/wallets` | Get my wallet | User/Agent |
| GET | `/wallets/me:id` | Get wallet by ID | User/Agent/Admin |
|PATCH | `/wallets/block:id` | Get wallet by ID and update | Admin |


### Transaction Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/transactions/me` | Get my wallet | User/Agent |
| GET | `/transactions` | Get All wallet | Admin |
| POST | `/transactions/add-money` | Add money to wallet | User |
| POST | `/transactions/withdraw` | Withdraw from wallet | User |
| POST | `/transactions/send-money` | Send money to user | User |
| POST | `/transactions/cash-in` | Cash-in to user wallet | Agent |
| POST | `/transactions/cash-out` | Cash-out from user wallet | Agent |
POST | `/transactions/cash-out` | Cash-out from user wallet | Agent |

## 🔒 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcrypt with salt rounds
- **Role-based Access Control:** Route protection by user roles
- **Input Validation:** Zod schema validation
- **Error Handling:** Comprehensive error responses
- **Rate Limiting:** API rate limiting (optional)

## 💳 Transaction Types

- **ADD_MONEY:** User adds money to their wallet
- **WITHDRAW:** User withdraws money from their wallet
- **SEND_MONEY:** User sends money to another user
- **CASH_IN:** Agent adds money to user's wallet
- **CASH_OUT:** Agent withdraws money from user's wallet

## 📊 Business Logic

### User Registration Flow
1. User/Agent registers with basic information
2. System creates user account
3. Wallet automatically created with ৳50 initial balance
4. Users are immediately active
5. Agents require admin approval

### Transaction Flow
1. Validate transaction request
2. Check user/agent permissions
3. Verify wallet status and balance
4. Process transaction atomically
5. Update wallet balances
6. Record transaction history
7. Return confirmation

### Agent Approval Process
1. Agent registers with `PENDING` status
2. Admin reviews agent application
3. Admin approves/rejects agent
4. Approved agents can perform cash-in/cash-out
5. Suspended agents lose transaction privileges

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Transaction fees and agent commissions
- [ ] Daily/monthly transaction limits
- [ ] SMS/Email notifications
- [ ] Mobile app integration
- [ ] Multi-currency support
- [ ] Advanced analytics dashboard
- [ ] Fraud detection system
- [ ] API rate limiting
- [ ] Webhook integration



**Happy Coding! 🚀**
# Jodni - Digital Marketplace for Rural Artisans

<p align="center">
  <img src="./public/favicon.ico" alt="Jodni Logo" width="120"/>
</p>

## About Jodni

Jodni is a digital marketplace that connects rural artisans, farmers, and microentrepreneurs directly with customers. The platform aims to empower local producers by providing them with direct market access, bypassing traditional middlemen, and helping them achieve better prices for their products.

### The Problem

Rural artisans and small-scale producers often face significant challenges in accessing markets:

- Limited access to urban markets where their products could fetch better prices
- Dependency on intermediaries who take a large cut of the profits
- Lack of digital skills and infrastructure to sell online
- Limited visibility and brand recognition for their unique products
- Logistical challenges in product delivery and payment collection

### The Solution

Jodni addresses these challenges by:

- Creating a direct bridge between producers and consumers
- Providing a simple, mobile-first interface that's accessible to users with limited tech literacy
- Enabling secure and transparent payment processing
- Building trust through verified seller profiles and reviews
- Enhancing product discovery through categories and search functionality
- Supporting local economies by keeping more money in the hands of creators

## Key Features

- **Product Marketplace**: Artisans can showcase and sell their handmade products
- **Seller Profiles**: Detailed profiles for artisans and microentrepreneurs
- **Category-based Navigation**: Easy discovery of products by category
- **Real-time Updates**: Live product availability and order tracking
- **Mobile-First Design**: Accessible UI optimized for low-tech users
- **Simple Payment Flow**: Streamlined checkout process for buyers
- **Order Management**: Track and manage orders for both buyers and sellers
- **Animated UI**: Engaging animations to enhance user experience

## Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: TanStack React Query
- **Routing**: Wouter
- **Forms**: React Hook Form with Zod validation
- **UI Components**: ShadCN + Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payments**: Simple mock checkout flow

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd jodni
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL=postgresql://username:password@localhost:5432/jodni
   ```

4. Set up the database:
   ```
   # Create the database if it doesn't exist
   createdb jodni
   
   # Run database migrations
   npm run db:push
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Access the application at [http://localhost:5000](http://localhost:5000)

## Project Structure

### Client-Side Structure

- `/client`: Frontend code
  - `/src/components`: React components
    - `/ui`: Base UI components from ShadCN
    - `/layout`: Layout components (Header, Footer, Navigation)
    - `/home`: Components specific to the homepage
    - `/product`: Product-related components
  - `/src/pages`: Page components
    - `HomePage.tsx`: Main landing page
    - `ExplorePage.tsx`: Category and product exploration
    - `ProductDetailPage.tsx`: Detailed product view
    - `SellProductPage.tsx`: Form for listing new products
    - `MyOrdersPage.tsx`: Order tracking for buyers/sellers
    - `ProfilePage.tsx`: User profile management
  - `/src/hooks`: Custom React hooks
    - `use-toast.ts`: Toast notification system
    - `use-mobile.tsx`: Mobile device detection
    - `useConnection.ts`: Network connection state
  - `/src/lib`: Utility functions
    - `queryClient.ts`: API request handling
    - `utils.ts`: General utility functions
    - `icons.tsx`: Custom icon components

### Server-Side Structure

- `/server`: Backend code
  - `routes.ts`: API endpoints
  - `storage.ts`: Database operations and business logic
  - `db.ts`: Database connection configuration
  - `index.ts`: Server initialization
  - `vite.ts`: Development server configuration

### Shared Code

- `/shared`: Shared code between frontend and backend
  - `schema.ts`: Database schema definitions, relations, and TypeScript types

## Core Features (Implemented)

- **Product Listings**: Create, view, filter, and search products
- **Category Navigation**: Browse products by category
- **Seller Profiles**: View seller information and products
- **Order Management**: Place and track orders
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animated UI**: Smooth transitions and engaging interactions
- **PostgreSQL Database**: Reliable data storage with proper relations

## Future Enhancements

- **User Authentication**: Secure login and registration
- **Real-time Chat**: Direct communication between buyers and sellers
- **Location Services**: Geolocation-based product discovery
- **Multilingual Support**: Interface in regional languages
- **Offline Mode**: Basic functionality in low-connectivity areas
- **Analytics Dashboard**: Sales and performance metrics for sellers
- **Reviews and Ratings**: Build trust through customer feedback
- **Community Features**: Discussion boards and knowledge sharing
- **Wholesale Options**: Special pricing for bulk purchases
- **Logistics Integration**: Simplified shipping and delivery options
- **Educational Resources**: Training materials for artisans
- **Mock Payment Flow**: Simple checkout process simulation

## Contributing

Contributions to Jodni are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License.

---

<p align="center">
  <i>Empowering rural artisans through technology</i>
</p>

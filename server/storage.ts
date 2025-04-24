import {
  users, User, InsertUser,
  categories, Category, InsertCategory,
  products, Product, InsertProduct,
  orders, Order, InsertOrder,
  reviews, Review, InsertReview,
  messages, Message, InsertMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, ilike } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product operations
  getProduct(id: number): Promise<Product | undefined>;
  getProducts(limit?: number, offset?: number): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductsBySeller(sellerId: number): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getOrdersByBuyer(buyerId: number): Promise<Order[]>;
  getOrdersBySeller(sellerId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Review operations
  getReviewsByProduct(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Message operations
  getMessages(userId1: number, userId2: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Initialize database with default categories if needed
  constructor() {
    this.initializeCategories();
  }

  private async initializeCategories() {
    // Check if categories exist
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length === 0) {
      const defaultCategories: InsertCategory[] = [
        { name: "Agriculture", icon: "plant-line" },
        { name: "Handicrafts", icon: "hand-coin-line" },
        { name: "Textiles", icon: "t-shirt-line" },
        { name: "Jewelry", icon: "copper-coin-line" },
        { name: "Tools", icon: "hammer-line" }
      ];
      
      // Insert default categories
      await Promise.all(
        defaultCategories.map(category => this.createCategory(category))
      );
    }
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    try {
      const [updatedUser] = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, id))
        .returning();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    try {
      const [category] = await db.select().from(categories).where(eq(categories.id, id));
      return category;
    } catch (error) {
      console.error('Error fetching category:', error);
      return undefined;
    }
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    try {
      const [category] = await db.insert(categories).values(insertCategory).returning();
      return category;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }
  
  // Product methods
  async getProduct(id: number): Promise<Product | undefined> {
    try {
      const [product] = await db.select().from(products).where(eq(products.id, id));
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  }
  
  async getProducts(limit = 20, offset = 0): Promise<Product[]> {
    try {
      return await db
        .select()
        .from(products)
        .orderBy(products.dateAdded)
        .limit(limit)
        .offset(offset);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      return await db
        .select()
        .from(products)
        .where(eq(products.categoryId, categoryId));
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }
  
  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    try {
      return await db
        .select()
        .from(products)
        .where(eq(products.sellerId, sellerId));
    } catch (error) {
      console.error('Error fetching products by seller:', error);
      return [];
    }
  }
  
  async searchProducts(query: string): Promise<Product[]> {
    try {
      const lowerQuery = `%${query.toLowerCase()}%`;
      return await db
        .select()
        .from(products)
        .where(
          or(
            ilike(products.name, lowerQuery),
            ilike(products.description, lowerQuery)
          )
        );
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    try {
      const [product] = await db.insert(products).values(insertProduct).returning();
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
  
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product | undefined> {
    try {
      const [updatedProduct] = await db
        .update(products)
        .set(productData)
        .where(eq(products.id, id))
        .returning();
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      return undefined;
    }
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    try {
      await db.delete(products).where(eq(products.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
  
  // Order methods
  async getOrder(id: number): Promise<Order | undefined> {
    try {
      const [order] = await db.select().from(orders).where(eq(orders.id, id));
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      return undefined;
    }
  }
  
  async getOrdersByBuyer(buyerId: number): Promise<Order[]> {
    try {
      return await db
        .select()
        .from(orders)
        .where(eq(orders.buyerId, buyerId))
        .orderBy(orders.orderDate);
    } catch (error) {
      console.error('Error fetching orders by buyer:', error);
      return [];
    }
  }
  
  async getOrdersBySeller(sellerId: number): Promise<Order[]> {
    try {
      return await db
        .select()
        .from(orders)
        .where(eq(orders.sellerId, sellerId))
        .orderBy(orders.orderDate);
    } catch (error) {
      console.error('Error fetching orders by seller:', error);
      return [];
    }
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    try {
      const [order] = await db.insert(orders).values(insertOrder).returning();
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    try {
      const [updatedOrder] = await db
        .update(orders)
        .set({ status })
        .where(eq(orders.id, id))
        .returning();
      return updatedOrder;
    } catch (error) {
      console.error('Error updating order status:', error);
      return undefined;
    }
  }
  
  // Review methods
  async getReviewsByProduct(productId: number): Promise<Review[]> {
    try {
      return await db
        .select()
        .from(reviews)
        .where(eq(reviews.productId, productId))
        .orderBy(reviews.date);
    } catch (error) {
      console.error('Error fetching reviews by product:', error);
      return [];
    }
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    try {
      const [review] = await db.insert(reviews).values(insertReview).returning();
      return review;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }
  
  // Message methods
  async getMessages(userId1: number, userId2: number): Promise<Message[]> {
    try {
      return await db
        .select()
        .from(messages)
        .where(
          or(
            and(
              eq(messages.senderId, userId1),
              eq(messages.receiverId, userId2)
            ),
            and(
              eq(messages.senderId, userId2),
              eq(messages.receiverId, userId1)
            )
          )
        )
        .orderBy(messages.timestamp);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    try {
      const [message] = await db.insert(messages).values(insertMessage).returning();
      return message;
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    try {
      const [updatedMessage] = await db
        .update(messages)
        .set({ isRead: true })
        .where(eq(messages.id, id))
        .returning();
      return updatedMessage;
    } catch (error) {
      console.error('Error marking message as read:', error);
      return undefined;
    }
  }
}

export const storage = new DatabaseStorage();

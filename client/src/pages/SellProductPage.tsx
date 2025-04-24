import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import StatusBar from '@/components/layout/StatusBar';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeftIcon, ArrowRightIcon, CameraIcon } from '@/lib/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { insertProductSchema } from '@shared/schema';
import type { InsertProduct, Category } from '@shared/schema';

// Extend the product schema with validation rules
const sellProductSchema = insertProductSchema.extend({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  price: z.number().min(0.01, { message: "Price must be greater than 0" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  // images will be handled separately
});

type FormValues = z.infer<typeof sellProductSchema>;

const SellProductPage: React.FC = () => {
  const [location, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<(string | null)[]>([null, null]);
  
  // Get categories for dropdown
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });
  
  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(sellProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      quantity: 1,
      categoryId: 1, // Default to first category
      sellerId: 1, // Default user ID for demo
      location: 'Your Location', // Default location
      images: [] // Will be updated before submission
    }
  });
  
  const createProductMutation = useMutation({
    mutationFn: (data: InsertProduct) => {
      return apiRequest('POST', '/api/products', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      navigate('/');
    }
  });
  
  const handleImageUpload = (index: number) => {
    // In a real app, this would open a file picker and upload the image
    // For this demo, we'll just use placeholder images
    const placeholderImages = [
      'https://placehold.co/300x300/4F7942/ffffff?text=Main+Photo',
      'https://placehold.co/300x300/6B9362/ffffff?text=Photo+2',
      'https://placehold.co/300x300/3A5A31/ffffff?text=Photo+3'
    ];
    
    if (index === 0) {
      setMainImage(placeholderImages[0]);
    } else {
      const newAdditionalImages = [...additionalImages];
      newAdditionalImages[index - 1] = placeholderImages[index];
      setAdditionalImages(newAdditionalImages);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  
  const onSubmit = (data: FormValues) => {
    // Prepare images array from the uploaded images
    const images = [
      mainImage || 'https://placehold.co/300x300/4F7942/ffffff?text=Default',
      ...additionalImages.filter(img => img !== null) as string[]
    ];
    
    const productData: InsertProduct = {
      ...data,
      images
    };
    
    createProductMutation.mutate(productData);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <StatusBar />
      
      <div className="bg-white p-4 flex-1">
        <div className="flex items-center mb-4">
          <button 
            className="mr-3 text-neutral-800" 
            aria-label="Go back"
            onClick={handleBack}
          >
            <ArrowLeftIcon size={22} />
          </button>
          <h1 className="text-lg font-bold text-neutral-800">Add New Product</h1>
        </div>
        
        {/* Progress Steps */}
        <motion.div 
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <motion.div 
              className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-neutral-200'} text-white flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>1</span>
            </motion.div>
            <div className={`w-10 h-1 ${step >= 2 ? 'bg-primary' : 'bg-neutral-200'}`}></div>
            <motion.div 
              className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-neutral-200'} text-white flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>2</span>
            </motion.div>
            <div className={`w-10 h-1 ${step >= 3 ? 'bg-primary' : 'bg-neutral-200'}`}></div>
            <motion.div 
              className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary' : 'bg-neutral-200'} text-white flex items-center justify-center`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>3</span>
            </motion.div>
          </div>
        </motion.div>
        
        {step === 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <p className="text-sm text-neutral-600 text-center mb-4">Add photos and basic details of your product</p>
            
            {/* Image Upload Section */}
            <div className="mb-6">
              <div className="block text-sm font-medium text-neutral-700 mb-1">
                Product Photos <span className="text-red-500">*</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <motion.div 
                  className={`aspect-square border-2 border-dashed ${mainImage ? 'border-primary' : 'border-gray-300'} rounded-lg flex flex-col items-center justify-center ${mainImage ? 'bg-green-50' : 'bg-gray-50'} cursor-pointer`}
                  onClick={() => handleImageUpload(0)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mainImage ? (
                    <img src={mainImage} alt="Main product" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <>
                      <CameraIcon size={24} className="text-gray-400" />
                      <span className="text-xs text-gray-500 mt-1">Main Photo</span>
                    </>
                  )}
                </motion.div>
                {additionalImages.map((img, index) => (
                  <motion.div 
                    key={index}
                    className={`aspect-square border-2 border-dashed ${img ? 'border-primary' : 'border-gray-300'} rounded-lg flex items-center justify-center ${img ? 'bg-green-50' : 'bg-gray-50'} cursor-pointer`}
                    onClick={() => handleImageUpload(index + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {img ? (
                      <img src={img} alt={`Product ${index + 2}`} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Tap to add photos (max 3)</p>
            </div>
            
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Product Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="e.g. Handmade Clay Pot" 
                          className="border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Category <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select 
                        onValueChange={(value) => field.onChange(parseInt(value))} 
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="border border-gray-300 rounded-lg">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map(category => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Price <span className="text-red-500">*</span>
                        </FormLabel>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500">₹</span>
                          </div>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                              className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg"
                              placeholder="0"
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Quantity <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                            className="border border-gray-300 rounded-lg"
                            placeholder="e.g. 10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={3} 
                          className="border border-gray-300 rounded-lg"
                          placeholder="Tell customers about your product..."
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="button" 
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center"
                    onClick={handleNextStep}
                  >
                    Continue
                    <ArrowRightIcon className="ml-2" size={18} />
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <p className="text-sm text-neutral-600 text-center mb-4">Set pricing and delivery options</p>
            
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Your Location
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          className="border border-gray-300 rounded-lg"
                          placeholder="e.g. Jaipur, Rajasthan"
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <motion.div className="p-4 bg-gray-50 rounded-lg" whileHover={{ scale: 1.01 }}>
                  <h3 className="font-medium mb-2">Delivery Options</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="local-pickup" className="mr-2" defaultChecked />
                      <label htmlFor="local-pickup" className="text-sm">Local Pickup</label>
                    </div>
                    <span className="text-green-600 text-sm">Free</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input type="checkbox" id="delivery" className="mr-2" defaultChecked />
                      <label htmlFor="delivery" className="text-sm">Delivery</label>
                    </div>
                    <span className="text-sm">₹40</span>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    type="button" 
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center"
                    onClick={handleNextStep}
                  >
                    Continue
                    <ArrowRightIcon className="ml-2" size={18} />
                  </Button>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        )}
        
        {step === 3 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <p className="text-sm text-neutral-600 text-center mb-4">Review and publish your product</p>
            
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex mb-4">
                {mainImage && (
                  <img src={mainImage} alt="Product preview" className="w-24 h-24 object-cover rounded-lg mr-3" />
                )}
                <div>
                  <h3 className="font-semibold">{form.getValues('name')}</h3>
                  <p className="text-primary font-bold text-lg">₹{form.getValues('price')}</p>
                  <p className="text-xs text-gray-500">Quantity: {form.getValues('quantity')}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm font-medium mb-1">Description</p>
                <p className="text-sm text-gray-600">
                  {form.getValues('description') || 'No description provided'}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm font-medium mb-1">Shipping From</p>
                <p className="text-sm text-gray-600">{form.getValues('location')}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-yellow-800">
                Your product will be reviewed before being published. This usually takes less than 24 hours.
              </p>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="button" 
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold"
                onClick={() => form.handleSubmit(onSubmit)()}
                disabled={createProductMutation.isPending}
              >
                {createProductMutation.isPending ? "Publishing..." : "Publish Product"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SellProductPage;
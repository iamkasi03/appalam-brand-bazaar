import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface InventoryItem {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
  description: string;
  image?: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface InventoryContextType {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'status'>) => void;
  updateItem: (id: number, item: Partial<InventoryItem>) => void;
  deleteItem: (id: number) => void;
  reduceStock: (id: number, quantity: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  getFilteredItems: () => InventoryItem[];
  getCategories: () => string[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

const getStatus = (stock: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
};

const mockInventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Appalam Traditional",
    price: "₹150",
    stock: 50,
    category: "Traditional",
    description: "Classic handmade appalam with authentic spices",
    image: "/src/assets/hero-appalam.jpg",
    status: 'in-stock'
  },
  {
    id: 2,
    name: "Spicy Appalam Mix",
    price: "₹200",
    stock: 8,
    category: "Spicy",
    description: "Hot and spicy appalam variety pack",
    image: "/src/assets/product-packages.jpg",
    status: 'low-stock'
  },
  {
    id: 3,
    name: "Mini Appalam Pack",
    price: "₹120",
    stock: 0,
    category: "Traditional",
    description: "Small sized appalam perfect for kids",
    status: 'out-of-stock'
  },
  {
    id: 4,
    name: "Garlic Appalam",
    price: "₹180",
    stock: 25,
    category: "Flavored",
    description: "Garlic infused appalam with rich flavor",
    status: 'in-stock'
  },
  {
    id: 5,
    name: "Pepper Appalam",
    price: "₹170",
    stock: 15,
    category: "Spicy",
    description: "Black pepper flavored appalam",
    status: 'in-stock'
  }
];

export const InventoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) {
      setItems(JSON.parse(savedInventory));
    } else {
      setItems(mockInventoryData);
    }

    // Listen for inventory updates from cart
    const handleInventoryUpdate = () => {
      const updatedInventory = localStorage.getItem('inventory');
      if (updatedInventory) {
        setItems(JSON.parse(updatedInventory));
      }
    };

    window.addEventListener('inventoryUpdate', handleInventoryUpdate);
    return () => window.removeEventListener('inventoryUpdate', handleInventoryUpdate);
  }, []);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<InventoryItem, 'id' | 'status'>) => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    const newItem: InventoryItem = {
      ...item,
      id: newId,
      status: getStatus(item.stock)
    };
    
    setItems(prev => [...prev, newItem]);
    toast({
      title: "Item added",
      description: `${item.name} added to inventory`,
    });
  };

  const updateItem = (id: number, updatedItem: Partial<InventoryItem>) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updatedItem };
        if ('stock' in updatedItem) {
          updated.status = getStatus(updated.stock);
        }
        return updated;
      }
      return item;
    }));
    
    toast({
      title: "Item updated",
      description: "Inventory item has been updated",
    });
  };

  const deleteItem = (id: number) => {
    const item = items.find(i => i.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    
    if (item) {
      toast({
        title: "Item deleted",
        description: `${item.name} removed from inventory`,
      });
    }
  };

  const reduceStock = (id: number, quantity: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock - quantity);
        return {
          ...item,
          stock: newStock,
          status: getStatus(newStock)
        };
      }
      return item;
    }));
  };

  const getFilteredItems = () => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      const matchesStatus = !statusFilter || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const getCategories = () => {
    const categories = [...new Set(items.map(item => item.category))];
    return categories.sort();
  };

  const value = {
    items,
    addItem,
    updateItem,
    deleteItem,
    reduceStock,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    getFilteredItems,
    getCategories,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
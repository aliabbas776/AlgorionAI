import React from 'react';
import {
    BarChart, Zap, ShieldCheck, Truck, Car, Leaf,
    Tablets, HeartPulse, Landmark, Utensils, ShoppingBag, Film
} from 'lucide-react';

export const industriesData = [
    {
        id: 'fintech',
        name: 'Fintech',
        icon: <BarChart size={24} />,
        description: 'Empowering financial institutions with secure, scalable, and innovative digital solutions for the modern age.',
        image: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'energy',
        name: 'Energy',
        icon: <Zap size={24} />,
        description: 'Optimizing resource management and driving sustainability through smart energy solutions and real-time data analytics.',
        image: 'https://images.unsplash.com/photo-1466611653911-954ffaa1316c?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'insurance',
        name: 'Insurance',
        icon: <ShieldCheck size={24} />,
        description: 'Revolutionizing risk assessment and claims processing with advanced automation and data-driven insights.',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'logistics',
        name: 'Logistics',
        icon: <Truck size={24} />,
        description: 'Enhancing supply chain visibility and efficiency with intelligent tracking and route optimization technologies.',
        image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'automotive',
        name: 'Automotive',
        icon: <Car size={24} />,
        description: 'Accelerating the future of mobility with connected vehicle software and advanced automotive engineering.',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'agriculture',
        name: 'Agriculture',
        icon: <Leaf size={24} />,
        description: 'Transforming farming with precision agriculture solutions and IoT-enabled crop monitoring systems.',
        image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'pharma',
        name: 'Pharma',
        icon: <Tablets size={24} />,
        description: 'Streamlining drug discovery and clinical trials with secure data management and AI-driven analysis.',
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'healthcare',
        name: 'Healthcare',
        icon: <HeartPulse size={24} />,
        description: 'Improving patient outcomes and operational efficiency with interoperable health records and telemedicine platforms.',
        image: 'https://images.unsplash.com/photo-1504813184591-01592fd03cfd?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'government',
        name: 'Government',
        icon: <Landmark size={24} />,
        description: 'Enhancing public services and administrative transparency through secure e-governance and digital identity solutions.',
        image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'hospitality',
        name: 'Hospitality',
        icon: <Utensils size={24} />,
        description: 'Creating memorable guest experiences with personalized services and integrated reservation management systems.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'retail',
        name: 'Retail',
        icon: <ShoppingBag size={24} />,
        description: 'Driving sales and customer loyalty with omnichannel retail platforms and personalized marketing analytics.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 'media',
        name: 'Media & Entertainment',
        icon: <Film size={24} />,
        description: 'Pioneering the next generation of content delivery with high-performance streaming and interactive digital media.',
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop'
    }
];

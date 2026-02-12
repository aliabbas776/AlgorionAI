import React from 'react';
import {
    Code, Target, Cloud, Grid, Terminal,
    Layers, Shield, Search, Zap, Repeat, Cpu,
    Database, Activity, CheckCircle, Headphones,
    Settings, Globe, Eye, UserCheck, HardDrive,
    Monitor, BarChart, Server, Cpu as AiIcon, ArrowRight
} from 'lucide-react';

export const categories = [
    {
        id: 'engineering',
        title: 'Engineering',
        icon: <Grid size={40} />,
        description: 'End-to-end engineering services for seamless software delivery.',
        items: [
            {
                title: 'Application development',
                icon: <Code size={24} />,
                description: 'Bring your software vision to life with a tailored solution and deliver an industry-leading user experience.'
            },
            {
                title: 'PoC development',
                icon: <Target size={24} />,
                description: 'Safely explore business-boosting concepts with robust testing and expert road mapping.'
            },
            {
                title: 'Cloud computing',
                icon: <Cloud size={24} />,
                subItems: ['Cloud migration']
            },
            {
                title: 'Enterprise applications',
                icon: <Grid size={24} />,
                subItems: ['ERP consulting', 'CRM consulting']
            },
            {
                title: 'Legacy software modernization',
                icon: <Terminal size={24} />,
                description: 'Transform your core legacy systems to elevate performance, agility, scalability, and UX.'
            }
        ]
    },
    {
        id: 'advisory',
        title: 'Advisory',
        icon: <Shield size={40} />,
        description: 'Strategic guidance for top-notch products and services.',
        items: [
            {
                title: 'Product and service design',
                icon: <Layers size={24} />,
                description: 'Validate niche ideas and create innovative products and services that scale as your business does.'
            },
            {
                title: 'Cyber security',
                icon: <Shield size={24} />,
                description: 'Proactively identify threats to your digital infrastructure to futureproof your IT ecosystem.'
            },
            {
                title: 'Technical feasibility study',
                icon: <Search size={24} />,
                description: 'Explore new technologies and their potential for your business before making an investment.'
            },
            {
                title: 'Sustainability consulting',
                icon: <Activity size={24} />,
                description: 'Reach your net-zero goals and seize new, sustainable business growth opportunities.'
            },
            {
                title: 'Agile transformation',
                icon: <Repeat size={24} />,
                description: 'Transform your organization to achieve agility, resilience, and sustainable business growth.'
            },
            {
                title: 'AI consulting',
                icon: <AiIcon size={24} />,
                description: 'Get strategic guidance on implementing AI solutions for scalable business growth.'
            }
        ]
    },
    {
        id: 'data-ai',
        title: 'Data & AI',
        icon: <Zap size={40} />,
        description: 'Custom solutions to maximize the value of your data.',
        items: [
            {
                title: 'AI solutions advisor',
                icon: <Zap size={24} />,
                hasButton: true,
                buttonText: 'Start the assessment'
            },
            {
                title: 'Artificial intelligence',
                icon: <Cpu size={24} />,
                subItems: ['Generative AI', 'Machine learning', 'Conversational AI', 'Agentic AI', 'Data anonymization']
            },
            {
                title: 'Data science',
                icon: <Database size={24} />,
                description: 'Boost your business performance and achieve optimization through tailored data-driven solutions.'
            },
            {
                title: 'MLOps',
                icon: <Layers size={24} />,
                description: 'Achieve seamless integration and maximum ROI for your machine learning models.'
            },
            {
                title: 'Data engineering',
                icon: <Grid size={24} />,
                subItems: ['Data strategy', 'Data platforms', 'Business intelligence'],
                description: 'Get expert support and guidance at every stage of your AI journey.'
            },
            {
                title: 'Intelligent automation',
                icon: <Activity size={24} />,
                subItems: ['Intelligent document processing']
            },
            {
                title: 'LLMOps',
                icon: <Globe size={24} />,
                description: 'Streamline deployment, optimize performance, and maximize ROI for your large language models.'
            }
        ]
    },
    {
        id: 'optimisation',
        title: 'Optimisation',
        icon: <BarChart size={40} />,
        description: 'Expert help for flawless performance of your products and services.',
        items: [
            {
                title: 'Software audit',
                icon: <CheckCircle size={24} />,
                description: 'Assess your software products and processes to mitigate risks and minimize revenue loss.'
            },
            {
                title: 'Quality assurance',
                icon: <Shield size={24} />,
                description: 'Deliver flawless products and seamless user experiences with our expert QA services.'
            },
            {
                title: 'Support',
                icon: <Headphones size={24} />,
                description: 'Efficiently handle technical issues and system changes with our IT support services.'
            },
            {
                title: 'FinOps',
                icon: <BarChart size={24} />,
                description: 'Get expert guidance to maximize your cloud infrastructure value, optimise costs, and boost ROI.'
            }
        ]
    },
    {
        id: 'expertise',
        title: 'Expertise',
        icon: <Globe size={40} />,
        description: 'Latest technologies and innovative approaches to drive your business growth forward.',
        items: [
            {
                title: 'DevOps',
                icon: <Server size={24} />,
                description: 'Full-cycle DevOps solutions to optimise your SDLC for greater agility and cost-efficiency.'
            },
            {
                title: 'VR/AR/MR',
                icon: <Monitor size={24} />,
                description: 'Utilize virtual reality technologies to deliver brand-defining, immersive user experiences.'
            },
            {
                title: 'Internet of Things',
                icon: <Globe size={24} />,
                description: 'Embrace the potential of IoT for better efficiency, smoother collaboration and powerful data insights.'
            },
            {
                title: 'Market research',
                icon: <HardDrive size={24} />,
                description: 'Evaluate your business landscape to capitalise on promising niches and get ahead of the competition.'
            },
            {
                title: 'Customer experience',
                icon: <UserCheck size={24} />,
                description: 'Refine every customer interaction to enhance satisfaction and drive sustainable revenue growth.'
            },
            {
                title: 'Digital enterprise',
                icon: <Grid size={24} />,
                description: 'Introduce digital transformation to your enterprise to drive efficiency, productivity, and revenue.'
            },
            {
                title: 'UX consulting',
                icon: <Eye size={24} />,
                description: 'Launch successful products and deliver services that your customers will truly want to use.'
            },
            {
                title: 'Nearshore development',
                icon: <ArrowRight size={24} />,
                description: 'Partner with a trusted nearshore software development company to deliver your software project.'
            }
        ]
    }
];

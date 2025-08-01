"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Mail, Phone, Linkedin, Globe, Users, TrendingUp, Database, Cloud, Zap, Target } from 'lucide-react';

const ConsultingWebsite = () => {
  const [expandedService, setExpandedService] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const services = [
    {
      id: 'strategy',
      title: 'Executive IT Strategy & Digital Transformation',
      rate: '€140-170/hour',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'C-level technology strategy and digital transformation program design',
      details: [
        'Technology strategy and roadmap development',
        'Digital transformation program design and governance',
        'Enterprise architecture assessment',
        'Interim CTO/Technology Director services',
        'Cross-functional team alignment'
      ],
      value: 'Proven executive leadership scaling from 4 to 50-person teams with $5M+ P&L responsibility'
    },
    {
      id: 'delivery',
      title: 'Global Software Delivery & Agile Transformation',
      rate: '€120-150/hour',
      icon: <Globe className="w-6 h-6" />,
      description: 'End-to-end delivery frameworks and international team management',
      details: [
        'Agile/Scrum implementation and optimization',
        'Remote team management frameworks',
        'Project governance and KPI-driven performance',
        'Offshore/nearshore vendor selection',
        'Quality assurance strategies'
      ],
      value: '11 years managing 100+ successful projects across 10+ countries'
    },
    {
      id: 'data',
      title: 'Business Intelligence & Data Strategy',
      rate: '€130-160/hour',
      icon: <Database className="w-6 h-6" />,
      description: 'Enterprise data architecture and BI platform modernization',
      details: [
        'Data governance framework (GDPR, CCPA)',
        'BI platform modernization',
        'Data warehouse architecture review',
        'Advanced analytics and KPI frameworks',
        'Real-time dashboard strategy'
      ],
      value: 'Deep expertise from banking to gaming with regulatory compliance experience'
    },
    {
      id: 'crm',
      title: 'CRM & Marketing Technology',
      rate: '€110-140/hour',
      icon: <Users className="w-6 h-6" />,
      description: 'Sales process automation and marketing technology optimization',
      details: [
        'CRM strategy (HubSpot, AgileCRM, Salesforce)',
        'Sales process automation',
        'Inbound marketing and SEO optimization',
        'Campaign performance analytics',
        'Marketing technology stack integration'
      ],
      value: '4+ years scaling B2B sales from startup to $5M+ revenue'
    },
    {
      id: 'cloud',
      title: 'Cloud Architecture & Digital Platforms',
      rate: '€120-150/hour',
      icon: <Cloud className="w-6 h-6" />,
      description: 'Cloud migration strategy and scalable platform architecture',
      details: [
        'Cloud migration strategy (AWS, Azure, GCP)',
        'Containerization and microservices',
        'DevOps pipeline optimization',
        'Security and compliance frameworks',
        'Cost optimization strategies'
      ],
      value: 'Hands-on experience building cloud-native platforms at enterprise scale'
    },
    {
      id: 'innovation',
      title: 'Innovation & Product Strategy',
      rate: '€100-130/hour',
      icon: <Zap className="w-6 h-6" />,
      description: 'Product strategy development and innovation methodology',
      details: [
        'Product strategy and roadmap development',
        'MVP design and rapid prototyping',
        'Market validation methodologies',
        'Go-to-market strategy for tech products',
        'Innovation lab setup'
      ],
      value: 'Proven track record building multiple products from concept to market'
    }
  ];

  const packages = [
    {
      title: 'Digital Transformation Assessment',
      duration: '3 days (24 hours)',
      price: '€3,000-4,000',
      features: [
        'IT and process maturity evaluation',
        'Technology stack assessment',
        'Team capability analysis',
        'Quick-win identification',
        'Executive presentation'
      ]
    },
    {
      title: 'CRM & Sales Optimization Sprint',
      duration: '4 days (32 hours)',
      price: '€3,500-4,500',
      features: [
        'Sales process audit',
        'CRM platform evaluation',
        'Automation workflow design',
        'Performance dashboard setup',
        'Team training strategy'
      ]
    },
    {
      title: 'Offshore Development Strategy',
      duration: '2 days (16 hours)',
      price: '€2,000-2,500',
      features: [
        'Build vs offshore decision framework',
        'Vendor evaluation process',
        'Management framework design',
        'Risk mitigation strategies',
        'Implementation roadmap'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Baptiste Leroux</h1>
              <p className="text-blue-600 font-medium">Senior Digital Leader & IT Consultant</p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="mailto:lerouxbaptiste@hotmail.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Contact</span>
              </a>
              <a href="https://linkedin.com/in/baptiste-leroux-550662a" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Digital Future
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            20+ years of international expertise in digital transformation, from Oracle enterprise systems 
            to founding a $5M+ software agency. I help organizations bridge enterprise governance with startup agility.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">100+ Projects Delivered</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">10+ Countries</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">$5M+ Revenue Generated</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <span className="text-blue-600 font-semibold">50+ Team Members Led</span>
            </div>
          </div>
          <a href="mailto:lerouxbaptiste@hotmail.com" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Start Your Transformation
          </a>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: 'Services' },
              { id: 'packages', label: 'Starter Packages' },
              { id: 'experience', label: 'Experience' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Baptiste Leroux?</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">Proven Executive Leadership</h4>
                  <p className="text-gray-600">Scaled a software agency from 4 to 50 people with $5M+ P&L responsibility across 10+ countries.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">International Expertise</h4>
                  <p className="text-gray-600">Deep experience in regulated industries (banking) and global enterprises (Electronic Arts).</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-3">Full-Stack Innovation</h4>
                  <p className="text-gray-600">From Oracle enterprise systems to modern cloud-native platforms and social innovation leadership.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Expertise Areas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">Industries</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Financial Services & Banking</li>
                    <li>• Gaming & Entertainment</li>
                    <li>• E-commerce & Digital Platforms</li>
                    <li>• Hospitality & Travel Tech</li>
                    <li>• Enterprise Software & SaaS</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-600 mb-3">Technologies</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Cloud Platforms (AWS, Azure, GCP)</li>
                    <li>• Modern Web Frameworks (React, Node.js)</li>
                    <li>• Enterprise Systems (Oracle, SAP)</li>
                    <li>• BI Tools (PowerBI, Tableau, BusinessObjects)</li>
                    <li>• CRM Platforms (HubSpot, Salesforce)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Consulting Services</h3>
            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-blue-600">
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900">{service.title}</h4>
                          <p className="text-gray-600">{service.description}</p>
                          <span className="text-blue-600 font-semibold">{service.rate}</span>
                        </div>
                      </div>
                      {expandedService === service.id ? 
                        <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      }
                    </div>
                  </div>
                  
                  {expandedService === service.id && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4">
                        <h5 className="font-semibold text-gray-900 mb-3">Services Include:</h5>
                        <ul className="space-y-2 mb-4">
                          {service.details.map((detail, index) => (
                            <li key={index} className="text-gray-600">• {detail}</li>
                          ))}
                        </ul>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h6 className="font-semibold text-blue-900 mb-2">Unique Value:</h6>
                          <p className="text-blue-800">{service.value}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Starter Packages</h3>
            <p className="text-center text-gray-600 mb-12">Risk-reducing entry points to demonstrate value quickly</p>
            <div className="grid lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h4>
                  <div className="text-blue-600 font-semibold mb-4">{pkg.duration}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-6">{pkg.price}</div>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Professional Experience</h3>
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">CEO & Founder - StarTechUp Inc.</h4>
                    <p className="text-blue-600 font-medium mb-2">2013 - 2024 (11 years)</p>
                    <p className="text-gray-600 mb-4">
                      Built and scaled an international software development agency serving global clients across 10+ countries.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Led 50-person engineering team with budget planning and performance tracking</li>
                      <li>• Generated $5M+ revenue through 100+ digital solutions</li>
                      <li>• Implemented governance frameworks for resource allocation and quality assurance</li>
                      <li>• Managed business development, CRM strategy, and international client acquisition</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">CRM Operations & Analytics Manager - Electronic Arts</h4>
                    <p className="text-green-600 font-medium mb-2">2010 - 2013 (3 years)</p>
                    <p className="text-gray-600 mb-4">
                      Led performance analytics for EA's digital marketing initiatives across EMEA region.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Increased user engagement by 40% through advanced segmentation and targeting</li>
                      <li>• Analyzed multi-channel data from web, game telemetrics, and CRM systems</li>
                      <li>• Achieved 30M+ monthly impressions across EMEA markets</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900">Data Analyst - Banque Cantonale Vaudoise</h4>
                    <p className="text-purple-600 font-medium mb-2">2009 - 2010</p>
                    <p className="text-gray-600 mb-4">
                      Designed enterprise reporting solutions for strategic decision-making in asset management and risk.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Built functional data warehouse and multiple data marts</li>
                      <li>• Developed 50+ interactive dashboards using BusinessObjects</li>
                      <li>• Enhanced stock market risk analysis and regulatory reporting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Digital Strategy?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how my 20+ years of international experience can accelerate your digital transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:lerouxbaptiste@hotmail.com" 
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </a>
            <a 
              href="https://linkedin.com/in/baptiste-leroux-550662a" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-bold text-lg">Baptiste Leroux</h4>
              <p className="text-gray-400">Senior Digital Leader & IT Consultant</p>
            </div>
            <div className="flex items-center space-x-6">
              <a href="mailto:lerouxbaptiste@hotmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:+33778555980" className="text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/baptiste-leroux-550662a" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">Based in Paris, France • Available for projects across Europe</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsultingWebsite;

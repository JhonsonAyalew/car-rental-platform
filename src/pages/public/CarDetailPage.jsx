import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Star, MapPin, Package, Fuel, Clock, CheckCircle,
  ChevronLeft, ChevronRight, Heart, Share2, AlertCircle,
  Truck, Gauge, Users, Shield
} from 'lucide-react';

import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Spinner from '../../components/ui/Spinner';

const EquipmentDetailPage = () => {
  const { t } = useTranslation(['common', 'equipment']);
  const { id } = useParams();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rentalType, setRentalType] = useState('daily');
  const [hours, setHours] = useState(8);
  const [totalPrice, setTotalPrice] = useState(0);

  // Your equipment database as array
  const equipmentDatabase = [
    
  {
    "id": 1,
    "name": "CAT 320 Excavator",
    "brand": "Caterpillar",
    "model": "320",
    "price": 8500,
    "hourlyRate": 1200,
    "rating": 4.9,
    "reviewCount": 45,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjQijEXK7zvAaspMZUERi3MJLmK1KmNYLE-iqM0GhRA&s=10",
      "https://media.istockphoto.com/id/1326607884/photo/excavator-on-the-construction-site.jpg?s=612x612&w=0&k=20&c=UmWnXJXhNh4oU44kfB7gxrUK1UlA1u5XoWJ7X8qj8M0="
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Excavator",
    "attachment": "Shovel",
    "weight": "20 tons",
    "enginePower": "250 HP",
    "fuelType": "Diesel",
    "operatingHours": 1250,
    "description": "Powerful CAT 320 excavator perfect for large construction projects in Addis Ababa. Features include advanced hydraulics, comfortable cab with AC, and low emissions.",
    "features": ["Advanced Hydraulics", "Air Conditioned Cab", "Low Emissions", "GPS Tracking"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 2,
    "name": "SANY SY335 Excavator",
    "brand": "SANY",
    "model": "SY335",
    "price": 7800,
    "hourlyRate": 1100,
    "rating": 4.8,
    "reviewCount": 32,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhy9e8Ce4B33NOhAnf_ud0B5zuPhrjAM2-KPBjUKse80lSJawCfdlH9JBi&s=10",
      "https://5.imimg.com/data5/SELLER/Default/2023/9/344305357/LX/XV/PY/174195869/sy335h-excavator.jpeg"
    ],
    "location": "Dire Dawa, Ethiopia",
    "type": "Excavator",
    "attachment": "Hammer",
    "weight": "33 tons",
    "enginePower": "268 HP",
    "fuelType": "Diesel",
    "operatingHours": 850,
    "description": "Versatile SANY SY335 excavator with hydraulic hammer attachment. Perfect for demolition and rock breaking.",
    "features": ["Hydraulic Hammer", "Comfortable Cab", "Fuel Efficient"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 3,
    "name": "CAT 950 Wheel Loader",
    "brand": "Caterpillar",
    "model": "950",
    "price": 7200,
    "hourlyRate": 1000,
    "rating": 4.9,
    "reviewCount": 28,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-CZdvnsdrhfl0HNQByq1RFe_nZLOoxwAf8BrvtjhBqw&s=10",
      "https://media.istockphoto.com/id/1387143240/photo/wheel-loader-in-a-quarry.jpg?s=612x612&w=0&k=20&c=HzqJ4QQsdwadRVx2JugrFCyygXZz3H0Y-YnJnoYT0-0="
    ],
    "location": "Hawassa, Ethiopia",
    "type": "Loader",
    "attachment": "Bucket",
    "weight": "25 tons",
    "enginePower": "250 HP",
    "fuelType": "Diesel",
    "operatingHours": 620,
    "description": "CAT 950 wheel loader with large bucket capacity. Ideal for loading trucks and material handling.",
    "features": ["Large Bucket", "Quick Coupler", "LED Lights"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 4,
    "name": "CAT 430 Backhoe Loader",
    "brand": "Caterpillar",
    "model": "430",
    "price": 5500,
    "hourlyRate": 800,
    "rating": 4.7,
    "reviewCount": 19,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFwNhYDEf8xKGGY6s92m03WMHpeFLneV6V2EbC9m9BQ&s",
      "https://media.istockphoto.com/id/157411621/photo/backhoe-loader.jpg?s=612x612&w=0&k=20&c=Gs5h_YE5OGxGc56v4BxdJRC7em5uM-L0j5c60a4ovC4="
    ],
    "location": "Mekelle, Ethiopia",
    "type": "Backhoe Loader",
    "attachment": "Bucket + Backhoe",
    "weight": "9 tons",
    "enginePower": "98 HP",
    "fuelType": "Diesel",
    "operatingHours": 2100,
    "description": "Versatile CAT 430 backhoe loader perfect for urban construction and utility work.",
    "features": ["Quick Attach", "4x4 Drive", "Hydraulic Controls"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 5,
    "name": "Komatsu D65 Bulldozer",
    "brand": "Komatsu",
    "model": "D65",
    "price": 9000,
    "hourlyRate": 1300,
    "rating": 4.8,
    "reviewCount": 41,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUq4zeRFFgxFYxHOghAjsGZqz6HB7MARd79lpTU5JDwQ&s=10",
      "https://media.istockphoto.com/id/1174606845/photo/bulldozer-on-construction-site.jpg?s=612x612&w=0&k=20&c=Y5_jRkM45o8PyvTwPZ2RTSPMrWr5sPwz4RzpKNRf_1o="
    ],
    "location": "Adama, Ethiopia",
    "type": "Bulldozer",
    "attachment": "Blade",
    "weight": "22 tons",
    "enginePower": "220 HP",
    "fuelType": "Diesel",
    "operatingHours": 1800,
    "description": "Komatsu D65 dozer with straight blade. Perfect for land clearing and grading.",
    "features": ["Straight Blade", "ROPS Cab", "GPS Ready"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 6,
    "name": "CAT 140M Motor Grader",
    "brand": "Caterpillar",
    "model": "140M",
    "price": 8000,
    "hourlyRate": 1150,
    "rating": 4.8,
    "reviewCount": 23,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6U-WSl2JQr17KXXFcrdCV_WDoiCgiN1tmcJT5BKCDSQ&s=10",
      "https://media.istockphoto.com/id/1321500849/photo/motor-grader-on-a-road-construction-site.jpg?s=612x612&w=0&k=20&c=PAhEx3yXHyWxUh1rc5L-mN5MVVZ6Q07qxX5mVzSqdDs="
    ],
    "location": "Bahir Dar, Ethiopia",
    "type": "Grader",
    "attachment": "Blade",
    "weight": "15 tons",
    "enginePower": "180 HP",
    "fuelType": "Diesel",
    "operatingHours": 950,
    "description": "CAT 140M motor grader ideal for road construction and grading.",
    "features": ["Articulated Frame", "Hydraulic Controls", "GPS Grade Control"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 7,
    "name": "CAT M318 Wheeled Excavator",
    "brand": "Caterpillar",
    "model": "M318",
    "price": 7500,
    "hourlyRate": 1050,
    "rating": 4.7,
    "reviewCount": 15,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdJxQmKgfAP_M6dGQxKF6GD57KKUcw-eqHw8X700TVzQ&s=10",
      "https://media.istockphoto.com/id/1456789123/photo/wheeled-excavator.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Wheeled Excavator",
    "attachment": "Shovel",
    "weight": "18 tons",
    "enginePower": "174 HP",
    "fuelType": "Diesel",
    "operatingHours": 980,
    "description": "CAT M318 wheeled excavator with excellent mobility for urban projects.",
    "features": ["Wheeled Mobility", "Advanced Hydraulics", "Comfort Cab"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 8,
    "name": "Liebherr LTM 1050 Crane",
    "brand": "Liebherr",
    "model": "LTM 1050",
    "price": 18000,
    "hourlyRate": 2500,
    "rating": 4.9,
    "reviewCount": 38,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyFrGooVS_TVdCm5CrnKzFwCgSZXiTp0PSij34BpBHQ&s=10",
      "https://media.istockphoto.com/id/1289456789/photo/mobile-crane.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Crane",
    "attachment": "Hook",
    "weight": "50 tons",
    "enginePower": "450 HP",
    "fuelType": "Diesel",
    "operatingHours": 1450,
    "description": "Powerful Liebherr LTM 1050 mobile crane with excellent lifting capacity for heavy construction and industrial projects.",
    "features": ["Telescopic Boom", "High Stability", "Advanced Safety Systems", "All-Terrain Mobility"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 9,
    "name": "Water Bowser Automatic",
    "brand": "HOWO",
    "model": "Water Tanker Auto",
    "price": 4500,
    "hourlyRate": 650,
    "rating": 4.6,
    "reviewCount": 27,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcResbZoJc6aBKb_MqMX-OgTNpmok3LjV3HhfE7eE3D9gA&s",
      "https://media.istockphoto.com/id/1401234567/photo/water-tanker-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Dire Dawa, Ethiopia",
    "type": "Water Truck",
    "attachment": "Automatic Sprinkler",
    "weight": "20 tons",
    "enginePower": "280 HP",
    "fuelType": "Diesel",
    "operatingHours": 1650,
    "description": "Reliable HOWO water bowser with automatic sprinkler system, ideal for road construction, dust control, and site watering.",
    "features": ["Large Capacity Tank", "Automatic Sprinkler", "High-Pressure Pump", "Rear Spray Bars"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 10,
    "name": "Water Bowser Manual",
    "brand": "HOWO",
    "model": "Water Tanker Manual",
    "price": 3800,
    "hourlyRate": 550,
    "rating": 4.5,
    "reviewCount": 22,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlLeUA0Va6oTjZX28tH3KJkd0AF27Bl7fb2DvBazhYQ&s",
      "https://media.istockphoto.com/id/1356789012/photo/water-bowser-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Hawassa, Ethiopia",
    "type": "Water Truck",
    "attachment": "Manual Sprinkler",
    "weight": "18 tons",
    "enginePower": "260 HP",
    "fuelType": "Diesel",
    "operatingHours": 1920,
    "description": "Cost-effective HOWO manual water bowser suitable for general site watering and dust suppression.",
    "features": ["Durable Tank", "Manual Controls", "Efficient Pump", "Multi-Directional Spray"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 11,
    "name": "Rollo Cargo Roller",
    "brand": "XCMG",
    "model": "XS Series",
    "price": 5000,
    "hourlyRate": 700,
    "rating": 4.6,
    "reviewCount": 31,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFu8-hzQMbEjG_fOU9tTUeyNJnINs4ZAN3VFH2RFJuQA&s=10",
      "https://media.istockphoto.com/id/1423456789/photo/road-roller.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Adama, Ethiopia",
    "type": "Road Roller",
    "attachment": "Drum",
    "weight": "12 tons",
    "enginePower": "120 HP",
    "fuelType": "Diesel",
    "operatingHours": 1350,
    "description": "XCMG vibratory road roller excellent for compacting soil, gravel, and asphalt in road construction projects.",
    "features": ["Vibratory Drum", "Articulated Steering", "Comfortable Operator Seat", "High Compaction Force"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 12,
    "name": "Sinotruk HOWO 371",
    "brand": "Sinotruk",
    "model": "HOWO 371",
    "price": 4800,
    "hourlyRate": 680,
    "rating": 4.6,
    "reviewCount": 29,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFJuBHGZHG9jFGPh8LBA-jsDeaPx8_cDb_lghfMg7UQ&s=10",
      "https://media.istockphoto.com/id/1367890123/photo/dump-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Dump Truck",
    "attachment": "Tipper",
    "weight": "25 tons",
    "enginePower": "371 HP",
    "fuelType": "Diesel",
    "operatingHours": 2100,
    "description": "Robust Sinotruk HOWO 371 dump truck with strong tipping capacity for hauling aggregates, sand, and construction materials.",
    "features": ["Heavy-Duty Tipper Body", "High Payload", "Reliable Engine", "Strong Chassis"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 13,
    "name": "Loaded Cargo Truck",
    "brand": "Sinotruk",
    "model": "HOWO Cargo",
    "price": 4200,
    "hourlyRate": 600,
    "rating": 4.5,
    "reviewCount": 24,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREBHA9B5KfrfUF10ddu4VyQg9_BJ7PyXQXoJiNCy8yA&s=10",
      "https://media.istockphoto.com/id/1390123456/photo/cargo-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Mekelle, Ethiopia",
    "type": "Cargo Truck",
    "attachment": "Flatbed",
    "weight": "30 tons",
    "enginePower": "340 HP",
    "fuelType": "Diesel",
    "operatingHours": 1780,
    "description": "Sinotruk flatbed cargo truck ideal for transporting construction materials, machinery, and general cargo.",
    "features": ["Spacious Flatbed", "High Load Capacity", "Durable Frame", "Good Fuel Efficiency"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 14,
    "name": "Casoni Compactor",
    "brand": "Casoni",
    "model": "Compactor Series",
    "price": 3500,
    "hourlyRate": 500,
    "rating": 4.5,
    "reviewCount": 18,
    "images": [
      "https://www.sonsraymachinery.com/wp-content/uploads/2025/03/Case-Compaction_Transparent-2.png",
      "https://media.istockphoto.com/id/1445678901/photo/compactor-roller.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Bahir Dar, Ethiopia",
    "type": "Compactor",
    "attachment": "Compactor Drum",
    "weight": "10 tons",
    "enginePower": "110 HP",
    "fuelType": "Diesel",
    "operatingHours": 1420,
    "description": "Casoni/Case compactor designed for effective soil and asphalt compaction on roads and construction sites.",
    "features": ["Vibratory System", "Heavy Drum", "Easy Maneuverability", "Operator Comfort"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 15,
    "name": "Pickup 4x4",
    "brand": "Toyota",
    "model": "Hilux / Land Cruiser Pickup",
    "price": 1800,
    "hourlyRate": 250,
    "rating": 4.7,
    "reviewCount": 52,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_o4ak7EsO8B8Lhd-3z0DJdEsnosMy9gisB73C_ejqg&s=10",
      "https://media.istockphoto.com/id/1309876543/photo/toyota-pickup.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Pickup",
    "attachment": "None",
    "weight": "2 tons",
    "enginePower": "170 HP",
    "fuelType": "Diesel",
    "operatingHours": 890,
    "description": "Reliable Toyota 4x4 pickup perfect for site supervision, light transport, and personnel movement on rough terrain.",
    "features": ["4x4 Drive", "High Ground Clearance", "Durable Build", "Spacious Cabin"],
    "deliveryAvailable": true,
    "operatorAvailable": false,
    "insuranceIncluded": true
  },
  {
    "id": 16,
    "name": "Teter 01 Transport",
    "brand": "Teter",
    "model": "Flatbed Transport",
    "price": 3200,
    "hourlyRate": 450,
    "rating": 4.4,
    "reviewCount": 16,
    "images": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flatbed_truck.jpg/640px-Flatbed_truck.jpg",
      "https://media.istockphoto.com/id/1412345678/photo/flatbed-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Dire Dawa, Ethiopia",
    "type": "Transport Truck",
    "attachment": "Flatbed",
    "weight": "15 tons",
    "enginePower": "220 HP",
    "fuelType": "Diesel",
    "operatingHours": 1650,
    "description": "Versatile flatbed transport truck suitable for moving construction equipment and materials across sites.",
    "features": ["Long Flatbed", "Strong Tie-Down Points", "Reliable Engine", "Good Stability"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 17,
    "name": "Teter 02 Transport",
    "brand": "Teter",
    "model": "Heavy Flatbed",
    "price": 3400,
    "hourlyRate": 480,
    "rating": 4.4,
    "reviewCount": 14,
    "images": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flatbed_truck.jpg/640px-Flatbed_truck.jpg",
      "https://media.istockphoto.com/id/1378901234/photo/transport-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Adama, Ethiopia",
    "type": "Transport Truck",
    "attachment": "Flatbed",
    "weight": "18 tons",
    "enginePower": "240 HP",
    "fuelType": "Diesel",
    "operatingHours": 1380,
    "description": "Heavy-duty flatbed truck for transporting larger loads and machinery between construction locations.",
    "features": ["Reinforced Frame", "High Payload Capacity", "Multi-Axle Option", "Secure Loading"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 18,
    "name": "Gypsum Truck",
    "brand": "HOWO",
    "model": "Bulk Material",
    "price": 3000,
    "hourlyRate": 420,
    "rating": 4.3,
    "reviewCount": 19,
    "images": [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-nBj5cFzsjbChdZnXDdyV-UmoSfl1Cdk4pmiLWor2Kg&s=10",
      "https://media.istockphoto.com/id/1334567890/photo/bulk-truck.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Hawassa, Ethiopia",
    "type": "Material Truck",
    "attachment": "Bulk Tank",
    "weight": "20 tons",
    "enginePower": "290 HP",
    "fuelType": "Diesel",
    "operatingHours": 1750,
    "description": "HOWO gypsum/material truck designed for efficient transport of bulk powders and construction materials.",
    "features": ["Sealed Bulk Tank", "Pneumatic Discharge", "Corrosion Resistant", "Large Capacity"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 19,
    "name": "Terazone Machine",
    "brand": "XCMG",
    "model": "Plate Compactor",
    "price": 4000,
    "hourlyRate": 580,
    "rating": 4.5,
    "reviewCount": 21,
    "images": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Road_roller_compactor.jpg/640px-Road_roller_compactor.jpg",
      "https://media.istockphoto.com/id/1289012345/photo/plate-compactor.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Compactor",
    "attachment": "Plate Compactor",
    "weight": "8 tons",
    "enginePower": "85 HP",
    "fuelType": "Diesel",
    "operatingHours": 1120,
    "description": "XCMG plate compactor / small roller ideal for compacting trenches, foundations, and smaller areas.",
    "features": ["Powerful Vibration", "Easy Transport", "Durable Plate", "Low Maintenance"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 20,
    "name": "Antenna Crane 8T",
    "brand": "XCMG",
    "model": "Small Crane 8T",
    "price": 6500,
    "hourlyRate": 950,
    "rating": 4.6,
    "reviewCount": 17,
    "images": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Liebherr_LTM_1050-3.1.jpg/640px-Liebherr_LTM_1050-3.1.jpg",
      "https://media.istockphoto.com/id/1456789124/photo/small-mobile-crane.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Addis Ababa, Ethiopia",
    "type": "Crane",
    "attachment": "Hook",
    "weight": "8 tons",
    "enginePower": "180 HP",
    "fuelType": "Diesel",
    "operatingHours": 980,
    "description": "Compact 8-ton mobile crane suitable for lifting in confined spaces and urban construction sites.",
    "features": ["Telescopic Boom", "High Precision", "Compact Design", "Safety Overload Protection"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  },
  {
    "id": 21,
    "name": "Antenna Crane 10T",
    "brand": "XCMG",
    "model": "Small Crane 10T",
    "price": 7500,
    "hourlyRate": 1100,
    "rating": 4.7,
    "reviewCount": 20,
    "images": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Liebherr_LTM_1050-3.1.jpg/640px-Liebherr_LTM_1050-3.1.jpg",
      "https://media.istockphoto.com/id/1423456780/photo/10-ton-crane.jpg?s=612x612&w=0&k=20&c=example"
    ],
    "location": "Mekelle, Ethiopia",
    "type": "Crane",
    "attachment": "Hook",
    "weight": "10 tons",
    "enginePower": "200 HP",
    "fuelType": "Diesel",
    "operatingHours": 850,
    "description": "10-ton capacity crane with good reach and stability for medium lifting tasks on construction sites.",
    "features": ["Extended Boom Reach", "Stable Outriggers", "User-Friendly Controls", "Durable Build"],
    "deliveryAvailable": true,
    "operatorAvailable": true,
    "insuranceIncluded": true
  }

        ];

  useEffect(() => {
    fetchEquipmentDetails();
  }, [id]);

  const fetchEquipmentDetails = () => {
    setLoading(true);
    setTimeout(() => {
      const equipmentData = equipmentDatabase.find(item => item.id === parseInt(id));
      setEquipment(equipmentData || null);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [startDate, endDate, rentalType, hours, equipment]);

  const calculateTotalPrice = () => {
    if (!equipment) return;
    if (rentalType === 'daily' && startDate && endDate) {
      const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));
      setTotalPrice(days * equipment.price);
    } else if (rentalType === 'hourly' && hours > 0) {
      setTotalPrice(hours * equipment.hourlyRate);
    }
  };

  const getRentalDuration = () => {
    if (rentalType === 'daily' && startDate && endDate) {
      const days = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)));
      return `${days} ${days > 1 ? t('duration.days', { ns: 'equipment' }) : t('duration.day', { ns: 'equipment' })}`;
    }
    if (rentalType === 'hourly' && hours > 0) {
      return `${hours} ${hours > 1 ? t('duration.hours', { ns: 'equipment' }) : t('duration.hour', { ns: 'equipment' })}`;
    }
    return '';
  };

  const formatCurrency = (amount) => `ETB ${amount.toLocaleString()}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!equipment) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{t('notFound.title', { ns: 'equipment' })}</h2>
          <p className="text-[#52525B] mb-6">{t('notFound.message', { ns: 'equipment' })}</p>
          <Link to="/search">
            <Button>{t('notFound.button', { ns: 'equipment' })}</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F8F6] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-[#52525B]">
          <Link to="/" className="hover:text-[#D97706]">{t('nav.home', { ns: 'equipment' })}</Link>
          <span className="mx-2">/</span>
          <Link to="/search" className="hover:text-[#D97706]">{t('nav.equipment', { ns: 'equipment' })}</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">{equipment.name}</span>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-96 bg-gray-200">
            <img
              src={equipment.images?.[currentImage] || 'https://via.placeholder.com/800x600?text=No+Image'}
              alt={equipment.name}
              className="w-full h-full object-cover"
            />
            {equipment.images?.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage(prev => prev > 0 ? prev - 1 : equipment.images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImage(prev => prev < equipment.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {equipment.images?.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {equipment.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${idx === currentImage ? 'border-[#D97706]' : 'border-transparent'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Rating */}
            <Card>
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="approved">{t('status.available', { ns: 'equipment' })}</Badge>
                    {equipment.attachment && (
                      <Badge variant="review">
                        🔧 {t(`attachments.${equipment.attachment.toLowerCase()}`, { ns: 'equipment' }) || equipment.attachment}
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">{equipment.name}</h1>
                  <p className="text-[#52525B]">
                    {equipment.brand} {equipment.model || ''} •{' '}
                    {t(`equipmentTypes.${equipment.type?.toLowerCase().replace(/\s+/g, '') || ''}`, { ns: 'equipment' }) || equipment.type}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-[#52525B] mt-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{equipment.rating}</span>
                      <span>({equipment.reviewCount || 0} {t('reviews.reviewsCount', { ns: 'equipment' })})</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{equipment.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" iconLeft={<Heart className="w-4 h-4" />}>
                    {t('actions.save', { ns: 'equipment' })}
                  </Button>
                  <Button variant="ghost" size="sm" iconLeft={<Share2 className="w-4 h-4" />}>
                    {t('actions.share', { ns: 'equipment' })}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Technical Specifications */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">{t('specifications.title', { ns: 'equipment' })}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{t('specifications.weight', { ns: 'equipment' })}</p>
                    <p className="font-medium">{equipment.weight}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{t('specifications.enginePower', { ns: 'equipment' })}</p>
                    <p className="font-medium">{equipment.enginePower}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{t('specifications.fuelType', { ns: 'equipment' })}</p>
                    <p className="font-medium">{equipment.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D97706]" />
                  <div>
                    <p className="text-xs text-[#A1A1AA]">{t('specifications.operatingHours', { ns: 'equipment' })}</p>
                    <p className="font-medium">{equipment.operatingHours?.toLocaleString() || 0} hrs</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h2 className="text-lg font-semibold mb-3">{t('description.title', { ns: 'equipment' })}</h2>
              <p className="text-[#52525B] leading-relaxed">{equipment.description}</p>
            </Card>

            {/* Features */}
            <Card>
              <h2 className="text-lg font-semibold mb-4">{t('features.title', { ns: 'equipment' })}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {equipment.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <div className="text-center mb-4">
                  <div className="flex justify-center gap-4 mb-3">
                    <button
                      onClick={() => setRentalType('daily')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${rentalType === 'daily' ? 'bg-[#D97706] text-white' : 'bg-[#F3F2EE] text-[#52525B]'}`}
                    >
                      {t('booking.dailyRate', { ns: 'equipment' })}
                    </button>
                    <button
                      onClick={() => setRentalType('hourly')}
                      className={`px-4 py-2 rounded-lg font-medium transition ${rentalType === 'hourly' ? 'bg-[#D97706] text-white' : 'bg-[#F3F2EE] text-[#52525B]'}`}
                    >
                      {t('booking.hourlyRate', { ns: 'equipment' })}
                    </button>
                  </div>

                  <p className="text-3xl font-bold text-[#D97706]">
                    {formatCurrency(rentalType === 'daily' ? equipment.price : equipment.hourlyRate)}
                  </p>
                  <p className="text-sm text-[#A1A1AA]">
                    {rentalType === 'daily' ? t('booking.perDay', { ns: 'equipment' }) : t('booking.perHour', { ns: 'equipment' })}
                  </p>
                </div>

                <Link to={`/customer/equipment-booking/${equipment.id}`}>
                  <Button className="w-full" size="lg">
                    {t('booking.continueButton', { ns: 'equipment' })}
                  </Button>
                </Link>

                <div className="mt-4 space-y-2 text-xs">
                  {equipment.deliveryAvailable && (
                    <div className="flex items-center gap-2 text-[#52525B]">
                      <Truck className="w-3 h-3" />
                      <span>{t('services.deliveryAvailable', { ns: 'equipment' }).replace('{city}', equipment.location.split(',')[0])}</span>
                    </div>
                  )}
                  {equipment.operatorAvailable && (
                    <div className="flex items-center gap-2 text-[#52525B]">
                      <Users className="w-3 h-3" />
                      <span>{t('services.operatorAvailable', { ns: 'equipment' })}</span>
                    </div>
                  )}
                  {equipment.insuranceIncluded && (
                    <div className="flex items-center gap-2 text-[#52525B]">
                      <Shield className="w-3 h-3" />
                      <span>{t('services.insuranceIncluded', { ns: 'equipment' })}</span>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailPage;

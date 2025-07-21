# Campus Safety App

A responsive **web application** designed to enhance campus safety by providing **emergency SOS alerts**, **real-time location sharing**, **emergency contacts management**, **community safety reports**, and **safety tips**.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [Folder Structure](#folder-structure)
6. [App Sections & Functions](#app-sections--functions)
    - [SOS Alerts](#1-sos-alerts)
    - [Location Sharing](#2-location-sharing)
    - [Emergency Contacts](#3-emergency-contacts)
    - [Community Reports](#4-community-reports)
    - [Safety Tips](#5-safety-tips)
    - [Dark Mode](#6-dark-mode)
    - [Fake Call]
7. [Screenshots](#screenshots)
8. [Future Enhancements](#future-enhancements)


---

## Overview
The **Campus Safety App** is a **student safety companion** designed for our college. 
It allows students to quickly send **SOS alerts with their location**, share real-time positions, store **emergency contacts**, and view or submit **community safety reports**.  
The app is **lightweight, mobile-first, and offline-friendly**.

---

## Features
- **SOS Button:** Instantly prepares a WhatsApp emergency message with your location.
- **Fake Call:** Plays a realistic ringtone sound.
- **Location Sharing:** Fetches your current location and provides a shareable Google Maps link.
- **Emergency Contacts:** Add, call, or WhatsApp your trusted contacts with one click.
- **Community Reports:** View and submit incident reports to keep the campus informed.
- **Safety Tips:** Curated tips to stay safe on campus.
- **Dark Mode:** One-click toggle for better visibility at night.
- **Toast Notifications:** User-friendly feedback for all actions.

---

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **Icons:** Font Awesome
- **Storage:** LocalStorage (for contacts and reports)
- **Responsive Design:** Mobile-first layout

---

## Installation & Setup
1. **Clone this repository:**
   ```bash
   git clone https://github.com/your-username/CampusSafetyApp.git
   cd CampusSafetyApp

2. Open index.html in any modern browser.
   
3. No server setup is required



## Folder Structure
```bash
CampusSafetyApp/
│
├── index.html        # Main landing page (SOS, Location, Contacts, Tips)
├── reports.html      # Community Reports page
├── style.css         # Styling and themes (Light/Dark)
├── script.js         # Core app logic
└── darkmode.js       # Dark mode toggle and storage


```
## App Sections & Functions

### **1. SOS Alerts**
**Button:** Large, pulsating **SOS button** for emergencies.

**Functionality:**
- Retrieves the user’s current location.
- Prepares a **WhatsApp emergency message** with coordinates.
- Shows a **visual confirmation** once the alert is triggered.

**Code Reference:**  
`handleSOSClick()` in `script.js`.

---

### **2. Location Sharing**
**Fetch Location:** Uses **HTML5 Geolocation API** to get current latitude and longitude.

**Actions:**
- Copy location link.
- Share location via WhatsApp.

**Code Reference:**
- `getCurrentLocation()`
- `copyLocationLink()`
- `shareLocationViaWhatsApp()`

---

### **3. Emergency Contacts**
**Add Contacts:** Store contacts locally (name & number).

**Quick Actions:**
- **Call** with one tap.
- **WhatsApp** message with one tap.
- **Delete** contacts.

**Code Reference:**
- `addContact()`
- `callContact()`
- `messageContact()`
- `deleteContact()`

---

### **4. Community Reports**
**Submit Reports:** A dedicated `reports.html` page.

**Features:**
- Submit reports with **incident details**.
- View all previous reports.
- Stored in **LocalStorage**.

**Future-ready:** Can be extended with filters, categories, or admin verification.

---

### **5. Safety Tips**
- A curated list of **Night Safety, Group Safety, Technology Safety, and Emergency Preparedness tips**.
- Displayed in **collapsible sections** for easy reading.

---

### **6. Dark Mode**
- **One-click toggle** using a floating button.
- **Preference stored** in LocalStorage.
- Automatically applies **preferred mode** on reload.

**Code Reference:**  
`darkmode.js`

---
### **7. Fake Call**
**Purpose:** Helps you escape uncomfortable situations by simulating an incoming call.

**Functionality:**
- Plays a **realistic ringtone sound**.



---

## Screenshots
![WhatsApp Image 2025-07-21 at 13 14 24_cf4f364f](https://github.com/user-attachments/assets/6221f69c-f125-403e-a24b-ec1dd7efd929)

![WhatsApp Image 2025-07-21 at 13 15 12_8f89aa9d](https://github.com/user-attachments/assets/5d09a3b4-4301-4eda-b474-703d217420ed)
![WhatsApp Image 2025-07-21 at 13 15 37_848e368b](https://github.com/user-attachments/assets/85a1c4a2-f676-42a3-9ae9-ba707ff3bc1f)

## Future Enhancements
- **Report Filters & Sorting** (by severity or date).
- **Safety Heatmap** using Google Maps API.
- **Push Notifications** for new reports.
- **Admin Dashboard** for campus authorities.
- **PWA Support** for offline functionality.



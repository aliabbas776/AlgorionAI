# AlgorianAI - Quick Start Deployment Guide

## 🚀 Deploy to AWS EC2 in 5 Steps

### Prerequisites
- AWS Account
- SSH client
- 15-20 minutes

---

## Step 1: Launch EC2 Instance (5 min)

1. Go to [AWS EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click **"Launch Instance"**
3. Configure:
   - **Name**: AlgorianAI-Production
   - **AMI**: Ubuntu Server 22.04 LTS
   - **Instance Type**: t2.medium (recommended) or t2.small (minimum)
   - **Key Pair**: Create new → Download `.pem` file
   - **Security Group**: Allow ports 22, 80, 443
   - **Storage**: 20 GB minimum
4. Click **"Launch Instance"**
5. Note your **Public IP address**

---

## Step 2: Connect to Your Server (2 min)

### Mac/Linux:
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@YOUR_EC2_IP
```

### Windows PowerShell:
```powershell
ssh -i C:\path\to\your-key.pem ubuntu@YOUR_EC2_IP
```

---

## Step 3: Run Automated Setup (10-15 min)

Copy and paste these commands one by one:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install -y git

# Clone repository
cd /var/www
sudo mkdir -p /var/www/algorianai
sudo chown -R $USER:www-data /var/www/algorianai
git clone https://github.com/aliabbas776/AlgorionAI.git algorianai

# Run setup script
cd algorianai/deployment
chmod +x initial_setup.sh
./initial_setup.sh
```

The script will automatically:
- ✅ Install all dependencies (Python, Node.js, Nginx)
- ✅ Set up Django backend
- ✅ Build React frontend
- ✅ Configure web server
- ✅ Start all services

---

## Step 4: Update Configuration (2 min)

After the script completes, update with your domain (or use IP temporarily):

```bash
# Get your EC2 IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "Your EC2 IP: $EC2_IP"

# Configuration files are already set up with IP
# If you have a domain, update these files:
nano /var/www/algorianai/.env
nano /var/www/algorianai/frontend/.env
sudo nano /etc/nginx/sites-available/algorianai
```

---

## Step 5: Access Your Application 🎉

Open your browser and visit:
- **Frontend**: `http://YOUR_EC2_IP`
- **Backend API**: `http://YOUR_EC2_IP/api`
- **Admin Panel**: `http://YOUR_EC2_IP/admin`

---

## 🔒 Optional: Set Up Domain & HTTPS

### Configure Domain:
1. Point your domain A record to your EC2 IP
2. Update configuration files with your domain
3. Rebuild and restart:
```bash
cd /var/www/algorianai/frontend
npm run build
sudo systemctl restart gunicorn nginx
```

### Install SSL Certificate (Free with Let's Encrypt):
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 📝 Deploying Updates

When you push changes to GitHub, deploy with:

```bash
cd /var/www/algorianai
bash deployment/deploy.sh
```

---

## 🆘 Troubleshooting

### Check if services are running:
```bash
sudo systemctl status gunicorn
sudo systemctl status nginx
```

### View logs:
```bash
sudo tail -f /var/log/gunicorn/error.log
sudo tail -f /var/log/nginx/error.log
```

### Restart services:
```bash
sudo systemctl restart gunicorn
sudo systemctl restart nginx
```

### See full documentation:
Refer to `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.

---

## 🎯 Useful Commands

```bash
# Check all logs
sudo tail -f /var/log/gunicorn/error.log /var/log/nginx/error.log

# Check disk space
df -h

# Update application
cd /var/www/algorianai
git pull origin main
bash deployment/deploy.sh

# Create Django superuser
cd /var/www/algorianai/main
source ../venv/bin/activate
python manage.py createsuperuser --settings=main.production_settings
```

---

## ✅ Success Checklist

- [ ] EC2 instance running
- [ ] SSH connection works
- [ ] Setup script completed without errors
- [ ] Application accessible at `http://YOUR_EC2_IP`
- [ ] Backend API responding at `http://YOUR_EC2_IP/api`
- [ ] Admin panel accessible at `http://YOUR_EC2_IP/admin`

---

## 📚 Next Steps

1. **Security**: Set up SSL certificate for HTTPS
2. **Domain**: Configure your custom domain
3. **Monitoring**: Set up application monitoring
4. **Backups**: Configure regular database backups
5. **Scaling**: Consider load balancing for high traffic

For detailed instructions, see the full [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

**Need Help?** Check the [full deployment guide](DEPLOYMENT_GUIDE.md) for troubleshooting and advanced configuration.

// A-Drop-v2 Interactive Engine

document.addEventListener('DOMContentLoaded', () => {
  initHeroCounter();
  initSimulator();
  initPitchTabs();
  initSmoothScroll();
});

/* Hero Counter Animation */
function initHeroCounter() {
  const speedElem = document.getElementById('hero-speed-val');
  if (!speedElem) return;
  
  let currentSpeed = 0;
  const targetSpeed = 209.3;
  const duration = 1500;
  const startTime = performance.now();
  
  function updateCounter(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    currentSpeed = (targetSpeed * easeProgress).toFixed(1);
    
    speedElem.textContent = currentSpeed;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/* Speed Simulator Logic */
const presets = {
  video: { name: '1080p Video (Python)', sizeMB: 55.9, desc: '55.9 MB File' },
  image: { name: '4K Screenshot', sizeMB: 0.43, desc: '431.7 KB File' },
  movie: { name: 'Full HD Movie', sizeMB: 2048, desc: '2.0 GB File' },
  huge: { name: '4K Raw Video Project', sizeMB: 51200, desc: '50.0 GB File' }
};

const speeds = {
  adrop: 209.3,       // MB/s
  airdrop: 55.0,      // MB/s
  quickshare: 12.0,   // MB/s
  mobile4g: 5.0       // MB/s
};

function initSimulator() {
  const presetBtns = document.querySelectorAll('.preset-btn');
  const customSlider = document.getElementById('custom-size-slider');
  const customSizeLabel = document.getElementById('custom-size-val');
  const runSimBtn = document.getElementById('run-sim-btn');

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-preset');
      if (presets[key]) {
        updateSimulation(presets[key].sizeMB);
        animateTransferSimulation();
        if (customSlider) {
          customSlider.value = Math.min(presets[key].sizeMB, 5000);
          if (customSizeLabel) customSizeLabel.textContent = formatSize(presets[key].sizeMB);
        }
      }
    });
  });

  if (customSlider) {
    customSlider.addEventListener('input', (e) => {
      presetBtns.forEach(b => b.classList.remove('active'));
      const sizeMB = parseFloat(e.target.value);
      if (customSizeLabel) customSizeLabel.textContent = formatSize(sizeMB);
      updateSimulation(sizeMB);
    });
  }

  if (runSimBtn) {
    runSimBtn.addEventListener('click', () => {
      animateTransferSimulation();
    });
  }

  // Initial Run with Default Preset (55.9 MB)
  updateSimulation(55.9);
  setTimeout(animateTransferSimulation, 500);
}

function formatSize(sizeMB) {
  if (sizeMB < 1) {
    return `${(sizeMB * 1024).toFixed(1)} KB`;
  } else if (sizeMB >= 1024) {
    return `${(sizeMB / 1024).toFixed(1)} GB`;
  } else {
    return `${sizeMB.toFixed(1)} MB`;
  }
}

function formatTime(seconds) {
  if (seconds < 0.05) return '0.0s (Instant)';
  if (seconds < 1) return `${seconds.toFixed(2)}s`;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(0);
  return `${mins}m ${secs}s`;
}

function updateSimulation(sizeMB) {
  const adropTime = sizeMB / speeds.adrop;
  const airdropTime = sizeMB / speeds.airdrop;
  const quickshareTime = sizeMB / speeds.quickshare;
  const mobile4gTime = sizeMB / speeds.mobile4g;

  // Dynamic bar width percentages relative to throughput speed
  setBar('bar-adrop', (speeds.adrop / speeds.adrop) * 100, formatTime(adropTime));
  setBar('bar-airdrop', Math.max((speeds.airdrop / speeds.adrop) * 100, 15), formatTime(airdropTime));
  setBar('bar-quickshare', Math.max((speeds.quickshare / speeds.adrop) * 100, 10), formatTime(quickshareTime));
  setBar('bar-4g', Math.max((speeds.mobile4g / speeds.adrop) * 100, 6), formatTime(mobile4gTime));

  const mathSize = document.getElementById('math-selected-size');
  const mathCalc = document.getElementById('math-calculated-time');
  if (mathSize) mathSize.textContent = formatSize(sizeMB);
  if (mathCalc) mathCalc.textContent = `${adropTime.toFixed(3)} seconds`;
}

function setBar(id, widthPercentage, timeText) {
  const fill = document.getElementById(`${id}-fill`);
  const label = document.getElementById(`${id}-time`);
  
  if (fill) {
    fill.style.width = `${widthPercentage}%`;
  }
  
  if (label) {
    label.textContent = timeText;
  }
}

// Function to simulate real-time transfer progress animation across bars
function animateTransferSimulation() {
  const bars = [
    { id: 'bar-adrop-fill', duration: 300 },
    { id: 'bar-airdrop-fill', duration: 1000 },
    { id: 'bar-quickshare-fill', duration: 2500 },
    { id: 'bar-4g-fill', duration: 4500 }
  ];

  bars.forEach(bar => {
    const fill = document.getElementById(bar.id);
    if (!fill) return;
    
    const targetWidth = fill.style.width || '100%';
    fill.style.transition = 'none';
    fill.style.width = '0%';
    
    setTimeout(() => {
      fill.style.transition = `width ${bar.duration / 1000}s ease-out`;
      fill.style.width = targetWidth;
    }, 50);
  });
}

/* Catchy & Engaging Hinglish Executive Pitch Content */
const pitches = {
  oneliner: `🚀 ONE-LINE FLEX PITCH:

"Maine ek aisa Universal Local File Transfer Engine banaya hai jo Google Quick Share ko 15x speed se beat karta hai, Apple AirDrop ki ecosystem walls ko todta hai, aur kisi bhi phone ya laptop par BINA KISI APP KO INSTALL KIYE 200+ MB/s ki speed par 50GB tak ki files seconds me stream kar deta hai!"

⚡ KEY HIGHLIGHTS:
• 0 KB App Download: Client device par koi APK ya app install nahi karni — instant QR scan and browser link!
• 209 MB/s Raw Speed: Hardware Wi-Fi link / Local TCP socket ki max capacity (1.67 Gbps) extract karta hai.
• Zero RAM Overflow: 100GB ki movie bhejo tab bhi server RAM flat ~50MB rehti hai!`,
  
  standing: `⚔️ TRILLION-DOLLAR TECH GIANTS SE REAL-WORLD MUKABLA:

🔴 vs Google Quick Share (Nearby Share):
  - Quick Share Bluetooth scan me 15 seconds lagata hai aur router fallback speed 8-10 MB/s par dam tod deti hai.
  - A-Drop-v2: Zero Bluetooth delay. Instant QR scan. Direct raw TCP/HTTP sockets par 209 MB/s (1.67 Gbps) speed!

⚪ vs Apple AirDrop:
  - AirDrop Apple ke "Walled Garden" (Jail) me closed hai — Windows ya Android par nahi chalta.
  - A-Drop-v2: Universal Freedom! iPhone, Android, Windows, Mac, Linux — sab par 1 second me connect hota hai.

🔵 vs LocalSend & Snapdrop:
  - LocalSend: Har samne waale dost ke phone me app install karwane ki friction!
  - Snapdrop: WebRTC memory leak! 2GB se badi movie dalo to browser crash ho jata hai.
  - A-Drop-v2: 0 KB Client Install & 50GB payload par bhi ZERO RAM Overflow!`,

  script: `🎙️ REAL-WORLD DHAMAKEDAR PITCH SCRIPT:

"Socho tum apne 4 doston ke saath baithe ho — sabke paas alag-alag phones hain (iPhone, Android, Windows Laptop). Tumne kisi ke phone me koi app install nahi karwayi.

Bas apna Hotspot ON kiya, QR code scan karwaya, aur 56 MB ki 1080p HD Tutorial Video tap ki... aur unke blink karne se pehle (EXACT 0.3 SECOND ME) 209 MB/s ki speed par video unke device me download ho gayi!

Chahe 500 MB ho ya 100 GB ki 4K movie, server ki RAM 50MB se 1MB bhi upar nahi jaati. Ye pure Local TCP Binary Streaming hai bina kisi cloud, internet, ya third-party app ke!" 🏆🔥`,

  verdict: `🏆 MIC-DROP FINAL VERDICT:

1. ⚡ Zero Friction: 0 App Download required (Runs 100% inside any web browser).
2. 🚀 Maximum Speed: 209 MB/s peak throughput (Faster than SSD physical write limits).
3. 🛡️ Zero RAM Leak: Chunked disk flushing engine (50GB+ payloads handle comfortably).
4. 🌐 Universal OS: Android, iOS, Windows, macOS, Linux, Smart TV full support.`
};

function initPitchTabs() {
  const tabs = document.querySelectorAll('.pitch-tab');
  const pitchText = document.getElementById('pitch-text-content');
  const copyBtn = document.getElementById('copy-pitch-btn');

  let currentKey = 'oneliner';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentKey = tab.getAttribute('data-tab');
      if (pitchText && pitches[currentKey]) {
        pitchText.textContent = pitches[currentKey];
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = pitches[currentKey];
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Pitch copied to clipboard! 📋🔥");
      });
    });
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

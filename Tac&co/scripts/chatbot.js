class Chatbot {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'chatbot-container';
        this.setupUI();
        this.initializeEventListeners();
        this.messages = [];
        this.initializeDraggable();
        
        // Initial greeting after a short delay
        setTimeout(() => {
            this.addMessage("Hi! I'm your TAC & Co. assistant. How can I help you today?", 'bot');
        }, 500);
    }

    setupUI() {
        this.container.innerHTML = `
            <button class="chatbot-button" aria-label="Open chat">
                <i class="fas fa-comments"></i>
            </button>
            <div class="chatbot-window">
                <div class="chatbot-header">
                    <span>TAC & Co. Assistant</span>
                    <button class="chatbot-close" aria-label="Close chat">×</button>
                </div>
                <div class="chatbot-messages"></div>
                <form class="chatbot-input">
                    <input type="text" placeholder="Type your message..." aria-label="Chat message">
                    <button type="submit" class="chatbot-send" aria-label="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(this.container);
    }

    initializeEventListeners() {
        const button = this.container.querySelector('.chatbot-button');
        const window = this.container.querySelector('.chatbot-window');
        const closeBtn = this.container.querySelector('.chatbot-close');
        const form = this.container.querySelector('.chatbot-input');
        const input = form.querySelector('input');

        button.addEventListener('click', () => {
            window.classList.add('active');
            input.focus();
        });

        closeBtn.addEventListener('click', () => {
            window.classList.remove('active');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = input.value.trim();
            if (message) {
                this.handleUserMessage(message);
                input.value = '';
            }
        });
    }

    addMessage(text, sender) {
        const messages = this.container.querySelector('.chatbot-messages');
        const message = document.createElement('div');
        message.className = `chat-message ${sender}-message`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
        this.messages.push({ text, sender });
    }

    async handleUserMessage(message) {
        this.addMessage(message, 'user');
        
        // Simulate typing indicator
        const typingMessage = document.createElement('div');
        typingMessage.className = 'chat-message bot-message';
        typingMessage.textContent = '...';
        this.container.querySelector('.chatbot-messages').appendChild(typingMessage);

        try {
            const response = await this.getBotResponse(message);
            typingMessage.remove();
            this.addMessage(response, 'bot');
        } catch (error) {
            typingMessage.remove();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    async getBotResponse(message) {
        // Comprehensive response database based on website content
        const responses = {
            // Services Related Responses
            'services': 'We offer a comprehensive suite of digital services including:\n\n' +
                      '1. Web & App Development\n' +
                      '2. Social Media Management & Marketing\n' +
                      '3. Branding\n' +
                      '4. SEO\n' +
                      '5. Content Creation & UGC Ads\n' +
                      '6. Photography & Cinematography\n' +
                      '7. Music & Audio Production\n' +
                      '8. Email, WhatsApp & SMS Marketing\n' +
                      '9. AI Automation\n\n' +
                      'Which service would you like to know more about?',
            
            // Specific Service Responses
            'web development': 'Our web and app development team creates cutting-edge, responsive digital solutions that drive growth and engagement. We specialize in modern web technologies and mobile app development.',
            
            'social media': 'We provide comprehensive social media management and marketing services, helping brands build credibility, community, and conversions. Our strategic approach ensures your social presence aligns with your business goals.',
            
            'branding': 'Our branding services help create a strong brand identity that resonates with your audience. From logo design to brand storytelling, we ensure your brand stands out and builds lasting value.',
            
            'seo': 'We enhance your online visibility through targeted SEO strategies and compelling content that drives organic traffic. Our approach combines technical optimization with quality content creation.',
            
            'content creation': 'From short-form reels to user-generated content ads, we create high-impact content tailored to your niche. Our content builds connection, boosts credibility, and drives conversions.',
            
            'photography': 'We capture stunning visuals that narrate your brand story through product shoots, event coverage, reels, and corporate videos. Our visual content is crafted to inspire, engage, and convert.',
            
            'audio': 'From brand jingles to podcast edits and voiceovers, we handle your entire audio identity with custom, high-quality production that connects emotionally with your audience.',
            
            'marketing': 'We craft targeted, personalized campaigns across email, WhatsApp, and SMS channels. Our approach focuses on automation, segmentation, and messaging that converts.',
            
            'ai': 'We implement AI-powered solutions for chatbots, workflows, analytics, and customer support to automate repetitive tasks and boost productivity.',

            // About Company
            'about': 'We\'re TAC & Co., a team of passionate young professionals where creativity meets clarity. Our mission is to empower brands through innovative digital solutions that drive growth and build lasting connections.',
            
            'team': 'Our leadership team includes:\n\n' +
                   '• Tejas Sawant - CEO, Co-Founder & Vision Lead\n' +
                   '• Cyrin Sajji - Co-Founder & Operations Head\n' +
                   '• Jasbir Singh Rawat - Co-Founder & Senior Advisor\n' +
                   'Each bringing unique expertise to deliver excellence.',

            // Contact Information
            'contact': 'You can reach us through:\n\n' +
                      '• Phone: +91 93249 41054\n' +
                      '• WhatsApp: +91 93249 41054\n' +
                      '• Contact Form: Available on our website\n\n' +
                      'Would you like me to connect you with our team?',

            // Process
            'process': 'Our creative process follows three key steps:\n\n' +
                      '1. Discover & Strategize: Deep dive into your brand and goals\n' +
                      '2. Create & Innovate: Bring strategy to life with compelling content\n' +
                      '3. Launch & Optimize: Ensure maximum impact and ROI',

            // Achievements
            'achievements': 'Our achievements include:\n\n' +
                          '• 121+ Projects Delivered\n' +
                          '• 22+ Happy Clients\n' +
                          '• 50M+ Overall Reach\n' +
                          '• 42M+ Overall Views\n' +
                          '• 30M+ Overall Likes',

            // Culture
            'culture': 'Our culture is built on three pillars:\n\n' +
                      '1. Think on Time: Strategic precision\n' +
                      '2. Work on Time: Efficient execution\n' +
                      '3. Deliver on Time: Punctual, quality results',

            // Default Response
            'default': 'I\'m here to help you learn more about TAC & Co.\'s digital services and solutions. You can ask me about:\n\n' +
                      '• Our Services\n' +
                      '• Company Information\n' +
                      '• Team Members\n' +
                      '• Contact Details\n' +
                      '• Process & Approach\n' +
                      '• Achievements\n\n' +
                      'What would you like to know more about?'
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Advanced keyword matching with multiple topic detection
        const lowercaseMsg = message.toLowerCase();
        
        // Try to find the most relevant response by scoring matches
        let bestResponse = responses.default;
        let highestScore = 0;

        for (const [key, response] of Object.entries(responses)) {
            // Split the key into words for more flexible matching
            const keywords = key.split(' ');
            let score = 0;

            // Calculate match score based on number of matching keywords
            for (const word of keywords) {
                if (lowercaseMsg.includes(word)) {
                    score += 1;
                    // Give bonus points for exact matches
                    if (lowercaseMsg === word) {
                        score += 2;
                    }
                }
            }

            // Update best match if this response has a higher score
            if (score > highestScore) {
                highestScore = score;
                bestResponse = response;
            }
        }

        // Special handling for complex queries
        if (lowercaseMsg.includes('cost') || lowercaseMsg.includes('price')) {
            return 'Our pricing is customized based on your specific needs and project requirements. Would you like to schedule a consultation to discuss your project in detail?';
        }

        if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
            return 'Hello! Welcome to TAC & Co. How can I assist you today? I can help you learn about our services, team, or schedule a consultation.';
        }

        if (lowercaseMsg.includes('thank')) {
            return 'You\'re welcome! Is there anything else you\'d like to know about TAC & Co.?';
        }

        if (lowercaseMsg.includes('bye') || lowercaseMsg.includes('goodbye')) {
            return 'Thank you for chatting with us! If you need anything else, don\'t hesitate to reach out. Have a great day!';
        }

        return bestResponse;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});

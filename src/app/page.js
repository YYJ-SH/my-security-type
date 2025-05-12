"use client";
import React, { useState, useEffect } from 'react';

// 폰트 스타일 정의
const FontStyles = () => (
  <style jsx global>{`
    @font-face {
      font-family: 'Jal_Haru';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jal_Haru.woff') format('woff');
      font-weight: normal;
      font-style: normal;
    }
    
    body {
      font-family: 'Jal_Haru', sans-serif;
    }

    .fun-bg {
      background: linear-gradient(135deg, #a259ff 0%, #6b7aff 100%);
    }
    
    .card-shadow {
      box-shadow: 0 10px 30px rgba(108, 99, 255, 0.2);
    }
    
    .option-card {
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .option-card:hover {
      border-color: #a259ff;
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(162, 89, 255, 0.15);
    }
    
    .progress-bar {
      background: linear-gradient(90deg, #fc6cff 0%, #a259ff 100%);
    }
    
    .result-icon {
      filter: drop-shadow(0 10px 20px rgba(162, 89, 255, 0.4));
    }
    
    .bounce {
      animation: bounce 2s infinite;
    }
    
    .floating {
      animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes floating {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-15px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    .confetti {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: confetti-fall linear forwards;
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(-50px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(800px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      z-index: 0;
      opacity: 0.6;
      animation: blob-move 20s infinite alternate;
    }
    
    @keyframes blob-move {
      0% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(50px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0, 0) scale(1);
      }
    }
    
    .hashtag {
      transition: all 0.2s ease;
    }
    
    .hashtag:hover {
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(162, 89, 255, 0.2);
    }
  `}</style>
);

// 배경 블롭 효과
const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="blob bg-purple-400" style={{ top: '10%', left: '10%', width: '300px', height: '300px' }}></div>
      <div className="blob bg-blue-400" style={{ top: '60%', right: '5%', width: '250px', height: '250px' }}></div>
      <div className="blob bg-pink-400" style={{ bottom: '10%', left: '20%', width: '200px', height: '200px' }}></div>
    </div>
  );
};

// 결과 축하 효과
const Confetti = ({ isActive }) => {
  useEffect(() => {
    if (!isActive) return;
    
    const container = document.getElementById('confetti-container');
    const colors = ['#a259ff', '#8c6fff', '#fc6cff', '#6b7aff', '#ffde59', '#ff914d'];
    
    const createConfetti = () => {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          
          // 랜덤 설정
          const left = Math.random() * window.innerWidth;
          const size = Math.random() * 10 + 5;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const duration = Math.random() * 3 + 2;
          const delay = Math.random() * 3;
          
          confetti.style.left = `${left}px`;
          confetti.style.width = `${size}px`;
          confetti.style.height = `${size}px`;
          confetti.style.background = color;
          confetti.style.animationDuration = `${duration}s`;
          confetti.style.animationDelay = `${delay}s`;
          
          container.appendChild(confetti);
          
          // 애니메이션 완료 후 제거
          setTimeout(() => {
            if (container.contains(confetti)) {
              container.removeChild(confetti);
            }
          }, (duration + delay) * 1000);
        }, i * 50);
      }
    };
    
    createConfetti();
    
    // 3초마다 새로운 콘페티 생성
    const interval = setInterval(createConfetti, 3000);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  return <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50"></div>;
};

// 공유 버튼 컴포넌트
const ShareButtons = ({ result }) => {
  const shareText = `내 보안 전문가 유형은 '${result.type}'입니다! #융보공 #보안진로테스트`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => alert('결과가 복사되었습니다! 친구들에게 공유해보세요!'))
      .catch(() => alert('복사에 실패했습니다. 직접 복사가 필요할 수 있습니다.'));
  };
  
  
  
  return (
    <div className="flex flex-wrap justify-center gap-3 my-5">
      <button 
        onClick={copyToClipboard}
        className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
        <span>결과 복사하기</span>
      </button>
      
      <button
        onClick={shareKakao}
        className="bg-yellow-400 text-yellow-900 px-4 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.4775 3 2 6.4775 2 12C2 17.5225 6.4775 21 12 21C17.5225 21 22 17.5225 22 12C22 6.4775 17.5225 3 12 3ZM16.5319 15.5912C16.3386 15.9246 15.9139 16.0553 15.5809 15.8635C14.274 15.0972 12.8267 14.9669 11.2014 15.236C10.8419 15.2982 10.4976 15.0709 10.4358 14.7114C10.374 14.3524 10.6003 14.0081 10.9603 13.9458C12.8744 13.6321 14.6158 13.7905 16.2601 14.7087C16.5931 14.901 16.7243 15.3262 16.5319 15.5912ZM17.7431 12.7956C17.496 13.2259 16.9436 13.3927 16.5128 13.1461C14.9439 12.2252 12.9855 12.0546 10.836 12.3941C10.3488 12.4764 9.89866 12.1575 9.81686 11.6702C9.73505 11.183 10.0535 10.7329 10.5412 10.6511C13.0305 10.2561 15.3548 10.4619 17.2631 11.5658C17.6939 11.8124 17.8601 12.3653 17.7431 12.7956ZM17.8602 9.89967C16.0081 8.83046 13.6289 8.6294 11.2265 9.02354C10.647 9.12354 10.0939 8.73549 9.99434 8.15644C9.89434 7.57693 10.2824 7.02342 10.8619 6.92342C13.6624 6.4657 16.4454 6.70327 18.6577 7.97508C19.1781 8.27556 19.3686 8.93654 19.0681 9.45699C18.7676 9.97744 18.1071 10.1685 17.8602 9.89967Z"/>
        </svg>
        <span>카톡으로 공유</span>
      </button>
      
      <button
        onClick={shareInstagram}
        className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span>인스타에 공유</span>
      </button>
    </div>
  );
};

// 메인 컴포넌트
const SecurityTestApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const fullJsonData = {
    "questions": [
      {
        "id": 1,
        "text": "팀플 과제가 생겼을 때, 당신은 주로 어떤 스타일인가요?",
        "options": [
          { "id": "A", "text": "자료 조사와 분석을 꼼꼼히 맡아서 정확하게 처리해요." },
          { "id": "B", "text": "톡톡 튀는 아이디어를 내고, 남들이 생각 못한 방법으로 접근해요." },
          { "id": "C", "text": "계획을 세우고 역할을 나눠 체계적으로 진행해요." },
          { "id": "D", "text": "전체적인 진행 상황을 파악하며 문제 생기면 빠르게 해결책을 제시해요." }
        ]
      },
      {
        "id": 2,
        "text": "카페에서 공부할 때 가장 좋아하는 환경은?",
        "options": [
          { "id": "A", "text": "조용하고 방해받지 않는 창가 구석 자리" },
          { "id": "B", "text": "사람들 말소리가 가득한 활기찬 분위기" },
          { "id": "C", "text": "정리된 공간에 모든 학습 자료를 깔끔하게 배치" },
          { "id": "D", "text": "다양한 메뉴를 즐기며 가끔씩 분위기를 바꾸는 것" }
        ]
      },
      {
        "id": 3,
        "text": "새로 나온 앱이나 기기를 처음 사용할 때 당신의 스타일은?",
        "options": [
          { "id": "A", "text": "설명서를 꼼꼼히 읽고 모든 기능을 완벽히 이해하고 사용해요." },
          { "id": "B", "text": "호기심을 따라 이것저것 눌러보며 새롭고 재미있는 활용법을 찾아요." },
          { "id": "C", "text": "공식적인 사용법을 찾아보고 효율적으로 사용하는 법을 배워요." },
          { "id": "D", "text": "필수 기능만 빠르게 익힌 후 필요할 때마다 배워나가요." }
        ]
      },
      {
        "id": 4,
        "text": "갑자기 내 SNS 계정이 해킹당한다면, 가장 먼저 하는 행동은?",
        "options": [
          { "id": "A", "text": "어떤 경로로 해킹당했는지 정확히 파악하고 증거를 수집해요." },
          { "id": "B", "text": "창의적인 방법으로 계정을 되찾고, 친구들에게 재미있게 알릴 방법을 생각해요." },
          { "id": "C", "text": "SNS의 공식 복구 절차에 따라 차근차근 복구해요." },
          { "id": "D", "text": "바로 친구들에게 알리고 계정을 잠근 후, 빠르게 대응 방법을 실행해요." }
        ]
      },
      {
        "id": 5,
        "text": "졸업 후 꿈꾸는 나의 모습은?",
        "options": [
          { "id": "A", "text": "특정 분야에서 전문가로 인정받으며 깊이 있게 연구하고 싶어요." },
          { "id": "B", "text": "창의적인 아이디어로 새로운 서비스나 기술을 개발하고 싶어요." },
          { "id": "C", "text": "안정적이고 예측 가능한 직장에서 조직 관리나 규정 준수를 담당하고 싶어요." },
          { "id": "D", "text": "리더십을 발휘해 팀을 이끌고 큰 프로젝트를 성공시키고 싶어요." }
        ]
      },
      {
        "id": 6,
        "text": "영화 속 해커 장면을 볼 때 당신의 관심을 가장 끄는 장면은?",
        "options": [
          { "id": "A", "text": "정교하게 데이터를 분석하고 범죄자의 다음 행적을 예측하는 장면" },
          { "id": "B", "text": "독특한 방법으로 시스템에 침투하는 모의 해킹 장면" },
          { "id": "C", "text": "디지털 범죄 현장에서 증거를 찾아 범인을 밝혀내는 포렌식 장면" },
          { "id": "D", "text": "세상을 위협하는 사이버 공격을 막기 위해 팀을 지휘하고 결정을 내리는 장면" },
         
        ]
      }
    ],
    "results": {
      "A": {
        "type": "사이버 위협 인텔리전스 분석가 (Cyber Threat Intelligence Analyst)",
        "description": "당신은 숨겨진 단서를 찾아내고, 흩어진 정보를 모아 적의 다음 움직임을 예측하는 뛰어난 분석가예요!",
        "details": "사이버 위협 인텔리전스 분석가는 최신 공격 트렌드, 악성코드, 해킹 그룹의 활동을 깊이 있게 분석하여 조직이 미래의 위협에 대비할 수 있도록 전략적 정보를 제공해요. 데이터 분석, 패턴 인식, 그리고 예리한 통찰력으로 위협의 그림을 완성해나가죠. 평균 연봉은 경력에 따라 다르지만, 신입은 4,000만원부터 시작하여 전문성을 인정받으면 6,000만원 이상, 숙련된 전문가는 8,000만원 이상도 가능해요.",
        "traits": "심층 분석, 패턴 인식, 공격자 관점 이해, 예측적 사고, 꼼꼼함",
        "icon": "🕵️‍♂️",
        "animation": "analyst-animation"
      },
      "B": {
        "type": "침투 테스터 / 윤리적 해커 (Penetration Tester / Ethical Hacker)",
        "description": "당신은 마치 게임처럼 시스템의 허점을 찾아내고, 창의적인 방법으로 방어벽을 시험하는 것을 즐기는군요!",
        "details": "침투 테스터는 기업의 시스템이나 네트워크에 합법적으로 모의 해킹을 수행하여 보안 취약점을 발견하고 개선 방안을 제시해요. 공격자의 시선으로 시스템을 바라보며, 누구도 생각지 못한 방법으로 허점을 파고드는 창의성과 끈기가 필요하답니다. 신입의 경우 약 3,500만원에서 4,500만원 수준이며, 경력이 쌓이고 성공적인 프로젝트 경험이 많아지면 6,000만원에서 1억원 이상도 받을 수 있어요.",
        "traits": "창의적 문제 해결, 도전 정신, 기술적 깊이, 윤리 의식, 실제 공격 시뮬레이션 선호",
        "icon": "🔓",
        "animation": "hacker-animation"
      },
      "C": {
        "type": "디지털 포렌식 조사관 (Digital Forensics Investigator)",
        "description": "당신은 디지털 세상의 탐정처럼, 사건 뒤에 남겨진 미세한 증거들을 끈기 있게 추적하고 진실을 밝혀내는 데 능숙해요!",
        "details": "디지털 포렌식 조사관은 사이버 범죄나 보안 사고 발생 시 컴퓨터, 스마트폰 등 디지털 기기에 남아있는 증거를 수집, 분석하여 사건의 전모를 파악하고 법적 증거를 확보하는 역할을 해요. 극도의 꼼꼼함과 분석력, 그리고 법적 절차에 대한 이해가 중요해요. 평균 연봉은 조사 기관이나 기업에 따라 차이가 있지만, 초임은 3,000만원 중후반에서 시작하며, 전문성과 경력이 쌓이면 5,000만원에서 7,000만원 이상을 기대할 수 있습니다.",
        "traits": "세밀한 관찰력, 분석적 사고, 증거 기반 추론, 객관성, 법적 지식",
        "icon": "🔎",
        "animation": "forensic-animation"
      },
      "D": {
        "type": "정보보호 최고 책임자 (CISO) / 보안 관리자 (Security Manager)",
        "description": "당신은 넓은 시야로 조직 전체의 보안을 조망하고, 팀을 이끌어 전략적인 방향을 설정하며 궁극적인 책임을 지는 리더의 자질을 갖추고 있네요!",
        "details": "보안 관리자는 조직의 정보보호 전략을 수립하고, 보안 팀을 운영하며, 예산과 자원을 관리하는 등 정보보호 프로그램 전반을 총괄해요. CISO는 이사회 및 경영진에게 직접 보고하며 기업의 정보보호에 대한 최종 의사결정을 내리고 책임을 지는 고위 임원이죠. 이 역할은 상당한 경력과 리더십, 그리고 비즈니스에 대한 이해가 필요해요. 보안 관리자의 경우 7,000만원 ~ 1억원 이상, CISO의 경우 기업 규모와 산업에 따라 1억원을 훌쩍 넘어 수억원에 이르기도 합니다.",
        "traits": "리더십, 전략적 비전, 의사결정 능력, 위기 관리, 정책 수립 및 개선 주도",
        "icon": "👑",
        "animation": "manager-animation"
      },
      "E": {
        "type": "클라우드 보안 엔지니어 (Cloud Security Engineer)",
        "description": "당신은 클라우드 환경의 특성을 잘 이해하고, 그 위에서 운영되는 시스템과 데이터를 안전하게 보호하는 혁신적인 기술을 적용하는 데 뛰어나요!",
        "details": "클라우드 보안 엔지니어는 AWS, Azure, GCP 등 클라우드 플랫폼 환경에서의 보안 아키텍처를 설계, 구축하고 운영해요. 접근 제어, 데이터 암호화, 네트워크 보안, 취약점 관리 등 클라우드 환경에 특화된 보안 솔루션과 서비스를 활용하여 안전한 클라우드 인프라를 유지합니다. 수요가 매우 높은 직군으로, 신입도 4,000만원 중후반에서 시작하며, 3~5년차에는 6,000만원 ~ 8,000만원, 그 이상 경력과 전문성을 갖추면 1억원 이상의 연봉도 가능합니다.",
        "traits": "클라우드 플랫폼 지식, 네트워크 보안, 자동화 스크립트 능력, 보안 아키텍처 설계, 혁신적 사고",
        "icon": "☁️🔒",
        "animation": "cloud-animation"
      }
    }
  };
  // JSON 데이터 로드
  useEffect(() => {
    try {
      // fullJsonData를 사용하여 데이터 설정
      setQuestions(fullJsonData.questions);
      setResults(fullJsonData.results);
      setIsLoading(false);
    } catch (error) {
      console.error('데이터 로드 중 오류 발생:', error);
      // 데이터 로드 실패 처리
      setIsLoading(false);
    }
  }, []);

  // 결과 계산 함수
  const getResult = (userAnswers) => {
    if (!userAnswers || userAnswers.length === 0 || !results) {
      return results.default;
    }

    // 정확한 키 매칭
    const key = userAnswers.join('');
    if (results[key]) {
      return results[key];
    }

    // 각 답변 유형 카운트
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    userAnswers.forEach(answer => {
      counts[answer]++;
    });

    // 가장 많이 선택된 유형 찾기
    let maxType = 'A';
    let maxCount = counts.A;
    
    for (const [type, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxType = type;
        maxCount = count;
      }
    }

    // 빈도 기반 매칭 시도
    if (counts.A >= 3) return results.A;
    if (counts.B >= 3) return results.B;
    if (counts.C >= 3) return results.C;
    if (counts.D >= 3) return results.D;
    
    // 마지막 질문(6번)이 A, B, C, D 중 하나면 해당 유형 반환
    if (userAnswers.length >= 6) {
      const lastAnswer = userAnswers[5];
      return results[lastAnswer] || results.default;
    }
    return results.default;
  };

  // 답변 선택 처리
  // handleAnswer 함수를 수정합니다
  const handleAnswer = (optionId) => {
    const newAnswers = [...answers, optionId];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      // 다음 문제로 넘어갈 때 모바일에서의 선택 상태를 해제하기 위한 코드
      setTimeout(() => {
        // 푸터 요소 찾기
        const footer = document.getElementById('footer');
        
        // 푸터 클릭하여 hover 상태 제거
        if (footer) {
          footer.click();
        }
        
        // 다음 문제로 이동
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      // 로딩 애니메이션 표시
      setIsLoading(true);
      
      // 잠시 지연 효과 후 결과 표시
      setTimeout(() => {
        setResult(getResult(newAnswers));
        setIsLoading(false);
        setShowConfetti(true);
      }, 1500);
    }
  };
  // 테스트 다시 시작
  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setShowIntro(true);
    setShowConfetti(false);
  };

  // 테스트 시작
  const handleStart = () => {
    setShowIntro(false);
  };

  if (isLoading && !showIntro) {
    return (
      <div className="min-h-screen fun-bg flex flex-col items-center justify-center p-4 text-white">
        <FontStyles />
        <BackgroundBlobs />
        <div className="text-center z-10">
          <div className="inline-block w-20 h-20 relative mb-8">
            <div className="absolute inset-0 border-t-4 border-l-4 border-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-r-4 border-b-4 border-pink-300 rounded-full animate-spin animate-reverse"></div>
          </div>
          <h2 className="text-3xl font-bold mb-4">보안 유형을 분석 중...</h2>
          <p className="text-lg opacity-80">잠시만 기다려주세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen fun-bg pt-6 pb-12 px-4 relative overflow-hidden">
      <FontStyles />
      <BackgroundBlobs />
      <Confetti isActive={showConfetti} />
      
      {/* 로고 헤더 */}
      <div className="flex justify-center mb-6 relative z-10">
        <div className="flex flex-col items-center bg-white bg-opacity-90 rounded-full px-6 py-3 shadow-xl">
          <div className="flex items-center">
            <span className="text-5xl mr-2 floating">🔒</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              融保工(융보공)
            </h1>
          </div>
          <p className="text-gray-600 text-sm mt-1">사이버 보안 진로 테스트</p>
        </div>
      </div>
      
      <div className="max-w-md mx-auto bg-white bg-opacity-95 rounded-3xl card-shadow overflow-hidden relative z-10">
        {showIntro ? (
          // 인트로 화면
          <div className="p-6 text-center">
            <div className="relative mb-6 mt-2">
              <img 
                src="/cute.png" 
                alt="보안 전문가들" 
                className="mx-auto rounded-2xl shadow-md"
              />
              <div className="absolute -bottom-3 -right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                #사이버보안진로
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent mb-4">
              나에게 맞는<br />보안 분야는 무엇일까요?
            </h1>
            
            <p className="text-gray-600 mb-6">
              어떤 보안 분야가 있는지 궁금하신가요?<br />
              자신의 성향에 맞는 보안 직무를 알아보세요!
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex bg-purple-50 p-4 rounded-xl transition-all duration-300 hover:bg-purple-100">
                <div className="mr-4 text-3xl">⏱️</div>
                <div className="text-left">
                  <h3 className="font-semibold text-purple-700">3분 완성!</h3>
                  <p className="text-sm text-gray-600">빠르게 진행할 수 있는 6개 질문</p>
                </div>
              </div>
              
              <div className="flex bg-purple-50 p-4 rounded-xl transition-all duration-300 hover:bg-purple-100">
                <div className="mr-4 text-3xl">💰</div>
                <div className="text-left">
                  <h3 className="font-semibold text-purple-700">연봉 정보 제공</h3>
                  <p className="text-sm text-gray-600">각 직무별 예상 연봉 확인 가능</p>
                </div>
              </div>
              
              <div className="flex bg-purple-50 p-4 rounded-xl transition-all duration-300 hover:bg-purple-100">
                <div className="mr-4 text-3xl">🎮</div>
                <div className="text-left">
                  <h3 className="font-semibold text-purple-700">공유 기능</h3>
                  <p className="text-sm text-gray-600">결과를 친구들과 공유해보세요</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleStart}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-full text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              테스트 시작하기 🚀
            </button>
            
            <p className="mt-4 text-xs text-gray-500">
              * 융보공 동아리에서 제작한 테스트입니다
            </p>
          </div>
        ) : result ? (
          // 결과 화면
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-8xl mb-5 result-icon bounce">{result.icon}</div>
              <div className="inline-block bg-gradient-to-r from-purple-600 to-violet-500 text-white px-4 py-2 rounded-full mb-3 shadow-lg">
                나의 보안 분야는?
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-3">
                {result.type}
              </h2>
              <p className="text-lg text-gray-700 bg-purple-50 p-4 rounded-xl">{result.description}</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl mb-6 border-2 border-purple-100 shadow-sm">
              <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center">
                <span className="text-2xl mr-2">✨</span> 상세 설명
              </h3>
              <p className="text-gray-700">{result.details}</p>
            </div>
            
            <div className="bg-white p-5 rounded-xl mb-6 border-2 border-blue-100 shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
                <span className="text-2xl mr-2">🔍</span> 주요 특성
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.traits.split(', ').map((trait, index) => (
                  <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hashtag shadow-sm">
                    #{trait.replace(/ /g, '_')}
                  </span>
                ))}
              </div>
            </div>
            
            {/* <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-dashed border-purple-200 mb-5">
              <h3 className="font-semibold text-purple-700 mb-3 flex items-center justify-center">
                <span className="text-xl mr-2">📲</span> 결과 공유하기
              </h3>
              <ShareButtons result={result} />
            </div> */}
            
            <div className="text-center">
              <button 
                onClick={handleRestart}
                className="py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                다시 테스트하기 🔄
              </button>
            </div>
          </div>
        ) : (
          // 질문 화면
          <div key={`question-${currentQuestion}`} className="p-6">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span className="font-medium">질문 {currentQuestion + 1} / {questions.length}</span>
                <span className="font-medium">{Math.round(((currentQuestion) / questions.length) * 100)}% 완료</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3.5">
                <div 
                  className="progress-bar h-3.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-purple-800 mb-6 bg-purple-50 p-4 rounded-xl shadow-sm">
              {questions[currentQuestion]?.text}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion]?.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full text-left p-4 bg-white border-2 border-purple-100 rounded-xl option-card shadow-sm"
                >
                  <div className="flex">
                    <span className="flex-shrink-0 inline-block w-8 h-8 leading-8 text-center bg-purple-100 text-purple-700 rounded-full mr-3 font-bold">
                      {option.id}
                    </span>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* 푸터 */}
      <div id = "footer" className="text-center mt-6 text-white text-opacity-95 text-sm relative z-10">
        <p className="font-medium">© 2025 融保工(융보공) 융합보안공학과 보안 동아리</p>
        
       
      </div>
    </div>
  );
};

// Next.js 페이지 컴포넌트
const Page = () => {
  return <SecurityTestApp />;
};

export default Page;
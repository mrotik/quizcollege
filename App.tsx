
import React, { useState, useCallback, useMemo } from 'react';
import { Category, Question, QuizState } from './types';
import { HTML_QUESTIONS, CSS_QUESTIONS, SECURITY_QUESTIONS, JS_QUESTIONS } from './data';
import { CodeIcon, CheckIcon, XIcon, RefreshIcon, ShieldCheckIcon, JsIcon } from './components/Icons';

const App: React.FC = () => {
  const [state, setState] = useState<QuizState>({
    currentCategory: null,
    currentQuestionIndex: 0,
    score: 0,
    userAnswers: [],
    status: 'idle',
  });

  const questions = useMemo(() => {
    if (!state.currentCategory) return [];
    if (state.currentCategory === Category.HTML) return HTML_QUESTIONS;
    if (state.currentCategory === Category.CSS) return CSS_QUESTIONS;
    if (state.currentCategory === Category.SECURITY) return SECURITY_QUESTIONS;
    return JS_QUESTIONS;
  }, [state.currentCategory]);

  const startQuiz = (category: Category) => {
    setState({
      currentCategory: category,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
      status: 'playing',
    });
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[state.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newUserAnswers = [
      ...state.userAnswers,
      { questionId: currentQuestion.id, answer, isCorrect }
    ];

    const nextIndex = state.currentQuestionIndex + 1;
    const isFinished = nextIndex >= questions.length;

    setState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      userAnswers: newUserAnswers,
      currentQuestionIndex: isFinished ? prev.currentQuestionIndex : nextIndex,
      status: isFinished ? 'finished' : 'playing',
    }));
  };

  const resetQuiz = () => {
    setState({
      currentCategory: null,
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: [],
      status: 'idle',
    });
  };

  const renderLanding = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="bg-indigo-600 p-4 rounded-3xl shadow-xl mb-8 animate-bounce">
        <CodeIcon className="w-16 h-16 text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Web Development Quiz
      </h1>
      <p className="text-lg text-slate-600 mb-12 max-w-md leading-relaxed">
        Ստուգեք ձեր գիտելիքները HTML-ի, CSS-ի, JS-ի և Կիբեռանվտանգության վերաբերյալ:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        <button
          onClick={() => startQuiz(Category.HTML)}
          className="group relative bg-white border-2 border-orange-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange-500 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-7xl font-black">HT</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">HTML</h2>
          <p className="text-slate-500">{HTML_QUESTIONS.length} հարց</p>
          <div className="mt-6 inline-flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
            Սկսել →
          </div>
        </button>

        <button
          onClick={() => startQuiz(Category.CSS)}
          className="group relative bg-white border-2 border-blue-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-7xl font-black">CS</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">CSS</h2>
          <p className="text-slate-500">{CSS_QUESTIONS.length} հարց</p>
          <div className="mt-6 inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
            Սկսել →
          </div>
        </button>

        <button
          onClick={() => startQuiz(Category.JAVASCRIPT)}
          className="group relative bg-white border-2 border-yellow-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-yellow-500 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <JsIcon className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">JavaScript</h2>
          <p className="text-slate-500">{JS_QUESTIONS.length} հարց</p>
          <div className="mt-6 inline-flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition-transform">
            Սկսել →
          </div>
        </button>

        <button
          onClick={() => startQuiz(Category.SECURITY)}
          className="group relative bg-white border-2 border-green-100 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-green-500 transition-all duration-300 text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <ShieldCheckIcon className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Security</h2>
          <p className="text-slate-500">{SECURITY_QUESTIONS.length} հարց</p>
          <div className="mt-6 inline-flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
            Սկսել →
          </div>
        </button>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = questions[state.currentQuestionIndex];
    const progress = ((state.currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={resetQuiz}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium transition-colors"
          >
            ← Դուրս գալ
          </button>
          <div className="text-slate-500 font-medium">
            Հարց {state.currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>

        <div className="w-full bg-slate-200 h-2 rounded-full mb-12 overflow-hidden shadow-inner">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(79,70,229,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-slate-100">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
            {state.currentCategory}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug mb-10">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-400 hover:scale-[1.01] transition-all duration-200 group flex items-center justify-between"
              >
                <span className="text-lg text-slate-700 font-medium group-hover:text-indigo-900">
                  {option}
                </span>
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const percentage = Math.round((state.score / questions.length) * 100);
    let feedback = "Հիանալի է:";
    let feedbackColor = "text-green-600";
    
    if (percentage < 50) {
      feedback = "Պետք է ավելին սովորել:";
      feedbackColor = "text-red-600";
    } else if (percentage < 80) {
      feedback = "Լավ է, բայց կարող եք ավելի լավ:";
      feedbackColor = "text-orange-600";
    }

    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-12 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
               <CodeIcon className="w-64 h-64 -ml-16 -mt-16 absolute" />
               <CodeIcon className="w-64 h-64 -mr-16 -mb-16 absolute bottom-0 right-0" />
            </div>
            
            <h2 className="text-2xl font-bold opacity-80 mb-2 uppercase tracking-widest">Արդյունքներ</h2>
            <div className="relative inline-block mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-800"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={364.4}
                  strokeDashoffset={364.4 - (364.4 * percentage) / 100}
                  className="text-indigo-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-black">
                {percentage}%
              </div>
            </div>
            <p className={`text-2xl font-bold mb-8 ${feedbackColor}`}>{feedback}</p>
            <p className="text-xl text-slate-400">
               {questions.length} հարցից ճիշտ եք պատասխանել <span className="text-white font-bold">{state.score}</span>-ին:
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => startQuiz(state.currentCategory!)}
                className="flex-1 bg-indigo-600 text-white py-4 px-8 rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <RefreshIcon className="w-5 h-5" /> Փորձել նորից
              </button>
              <button
                onClick={resetQuiz}
                className="flex-1 bg-slate-100 text-slate-700 py-4 px-8 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Գլխավոր էջ
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              Պատասխանների վերլուծություն
              <span className="text-sm font-normal text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Մանրամասն
              </span>
            </h3>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {state.userAnswers.map((answer, idx) => {
                const question = questions.find(q => q.id === answer.questionId);
                if (!question) return null;

                return (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-2xl border-l-4 ${
                      answer.isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-500 mb-2">ՀԱՐՑ {idx + 1}</p>
                        <p className="text-slate-900 font-semibold mb-3 leading-relaxed">{question.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                             <span className="text-xs font-bold text-slate-400 uppercase">Ձեր պատասխանը</span>
                             <p className={`font-medium ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                               {answer.answer}
                             </p>
                          </div>
                          {!answer.isCorrect && (
                             <div className="flex items-center gap-2">
                               <span className="text-xs font-bold text-slate-400 uppercase">Ճիշտ պատասխան</span>
                               <p className="text-green-700 font-bold">
                                 {question.correctAnswer}
                               </p>
                             </div>
                          )}
                        </div>
                      </div>
                      <div className={`p-2 rounded-full ${answer.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {answer.isCorrect ? <CheckIcon className="w-6 h-6" /> : <XIcon className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={resetQuiz} style={{ cursor: 'pointer' }}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <CodeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
              QuizMaster
            </span>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Armenian Edition
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8">
        {state.status === 'idle' && renderLanding()}
        {state.status === 'playing' && renderQuiz()}
        {state.status === 'finished' && renderResults()}
      </main>

      <footer className="py-12 text-center text-slate-400 border-t border-slate-200 mt-20">
        <p className="text-sm font-semibold text-slate-500 mb-2">Owner: Mariam</p>
        <p className="text-xs">© {new Date().getFullYear()} HTML, CSS, JS & Security Quiz. Բոլոր իրավունքները պաշտպանված են:</p>
      </footer>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;

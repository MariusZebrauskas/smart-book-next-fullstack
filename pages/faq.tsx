import { useEffect } from 'react';
import { useDispatch, DefaultRootState, useSelector } from 'react-redux';
import { closeMenu } from '../redux/menuRedux';
import { closeSubmenu } from '../redux/submenuReducer';
import { faqPage } from '../redux/pageReducer';
import gsap from 'gsap';
import Head from 'next/head';

const faqs = [
  {
    id: 1,
    question: 'How much cost excel to-do list?',
    answer: 'This application is compliantly free.',
  },
  {
    id: 2,
    question: 'Why choose us?',
    answer:
      'Because this company is a not-for-profit organization, all products developed to help people. Hopefully, this application will help you in any kind.',
  },
  {
    id: 3,
    question: 'What are the best practices for using an Excel to-do list?',
    answer: `This app is built for busy people who have too many things
     to remember. In this case, you are perfect to use this app. For example,
      if you have four kids and all kids go to different after-school clubs
       smart-book is a good place to store data of picking up times or bringing
        them back times from (to) after-school lessons.`,
  },
  {
    id: 4,
    question: 'How much cost to-do list?',
    answer: 'It is a completely free application.',
  },
  {
    id: 5,
    question: 'Is smart-book going to add more features?',
    answer:
      'Yes, please share with me cool APIS, and I`ll consider adding them to smart-book.',
  },

  {
    id: 7,
    question: 'What are the best practices to use to-do lists?',
    answer:
      'This list is best for adding shopping items, birthday dates, or any other data which will be useful in future.',
  },
  {
    id: 8,
    question: 'What is the age limit for smart-book?',
    answer: 'This website is good for any age people. There is no age limit.',
  },
  {
    id: 9,
    question: 'How to create an account?',
    answer:
      'You need to navigate to the login page then press register, then you will be transferred to the registration page.',
  },
  {
    id: 10,
    question: 'How long does it take to register an account?',
    answer: 'Usually, it takes less than 1 minute.',
  },
  {
    id: 11,
    question: 'How long does it take to get a response from the support team?',
    answer: 'To receive a response usually  takes 24 hours.',
  },

  // More questions...
];

interface T extends DefaultRootState {
  submenu: boolean;
  menu: boolean;
}

export default function faq() {
  const dispatch = useDispatch();
  const submenu = useSelector<T>((store) => store.submenu);
  const menu = useSelector<T>((store) => store.menu);
  const page = useSelector<T>((store) => store);

  useEffect(() => {
    // set homepage varaibles
    dispatch(faqPage());
    if (submenu) {
      dispatch(closeSubmenu());
    }
    if (menu) {
      dispatch(closeMenu());
    }
  }, []);

  // close sub menu & menu on mouse leave menu
  const onMouseEnter = () => {
    if (submenu) {
      dispatch(closeSubmenu());
    }
    if (menu) {
      dispatch(closeMenu());
    }
  };

  //   animation
  // animation
  var tlFaq = gsap.timeline();
  useEffect(() => {
    tlFaq.from('.animationFaq', {
      delay: 0.2,
      opacity: 0,
      duration: 1,
    });
  }, []);
  return (
    <div onMouseEnter={onMouseEnter} className='bg-gray-900'>
      <Head>
        <title>todo list - excel todo list / smart-book </title>
        <meta
          name='description'
          content='Frequently asked questions - excel todo list, todo list / smart-book'
        />
      </Head>
      <div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
        <div className='animationFaq lg:max-w-2xl lg:mx-auto lg:text-center'>
          <h2 className='text-3xl font-extrabold tracking-tight text-white sm:text-4xl'>
            Frequently asked questions
          </h2>
          <p className='mt-4 text-gray-400'>
            Can’t find the answer you’re looking for? Reach out to our customer support team.
          </p>
        </div>
        <div className='mt-20 mb-20 '>
          <dl className=' space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10'>
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className='animationFaq font-semibold text-white'>{faq.question}</dt>
                <dd className='animationFaq mt-3 text-gray-400'>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

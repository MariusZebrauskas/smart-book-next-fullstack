const posts = [
  {
    title: 'How beautiful is Barcelona? ',
    category: {
      name: 'Article',
      href: 'https://seriouslyspain.com/how-beautiful-is-barcelona-the-worlds-most-beautiful-city#:~:text=As%20far%20as%20cities%20go,Because%20think%20about%20it.&text=A%20city%20by%20the%20sea,ever%20see%20(La%20Rambla).',
    },
    description: `Even though I have traveled all over the world, and lived in five
       countries, Spain will always be the country I love the most. The beauty of the country. 
       The Spanish. The food. The culture. The history. The atmosphere. 
       As far as cities go, Barcelona is the world’s most beautiful city. At least to me.
Because think about it.
A city by the sea yet encircled by wooded mountains, with gorgeous architecture, beautiful churches, and a pedestrian thoroughfare that is one of the prettiest you will ever see (La Rambla). Gaudi’s the basilica La Sagrada Familia and Parc Guell.

The enormous open-air plaza La Plaza Real. The Gothic Quarter with its winding streets and stunning architecture.

Tidibado mountain and the Tidibado Amusement Park and those incredible views.

The Magic Fountain of Montjuic and its fantastical illuminated water shows.
Yes, Barcelona is the world’s most beautiful city. Why do you think so many movies are filmed in Barcelona (think Pedro Almodovar‘s All About My Mother, Woody Allen’s Vicky Cristina Barcelona, and Whit Stillman’s Barcelona).

And why do you think it is Spain’s number one tourist destination?

Still not sure?

Watch the gorgeous 2-minute video Barcelona Go! below, and you too will be in love with this incredible city. Then? Book your flight, of course.
       
       `,

    imageUrl: 'https://livingasturias.com/wp-content/uploads/2020/12/barcelona-652x324.jpg',
    readingTime: '6 min',
  },
];

export default function Example() {
  return (
    <div className='relative overflow-hidden bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
      <div className='absolute inset-0'>
        <div className='bg-white h-1/3 sm:h-2/3' />
      </div>
      <div className='relative max-w-7xl mx-auto'>
        <div className='text-center'>
          <h1 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
            Top 5 places to visit in Spain
          </h1>
          <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
            Spain is a wery rich in breathtaking natural features, with sunbathed beaches,
            crystal-clear waters, and vast stretches of mountainous ranges. The nation's rich
            history is evident in awe-inspiring museums and the stunning architecture that
            represents its turbulent past.
          </p>
        </div>
      </div>
      {/* main content  */}
      <main>
        {posts.map((post) => (
          <section className='lg:relative overflow-hidden mt-20 flex bg-slate-50 justify-center items-center flex-col'>
            <div className='w-full min-h-full '>
              <img className='w-full min-h-full' src={post.imageUrl} alt={post.title} />
            </div>
            <div className=''>
              <h2 className=''>{post.title}</h2>{' '}
              <p className=' max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
                {post.description}
              </p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

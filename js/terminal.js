$(() => {
    var data = [
    { 
      action: 'type',
      strings: ["npm install -g zasha^400"],
      output: '<span class="gray">+zasha@8.13.71 installed</span><br>&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ["zasha welcome^400"],
      output: ' ',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: [
        'Welcome to my website!', 
        'My name is Cam Zarubiak. I\'m a Software Developer currently based out of Victoria, British Columbia. I enjoy writing scalable code for projects with a purpose. ', 
        'I\'m currently working with frontend technologies such as React.js and Next.js, while also using backend technologies such as Django and Prisma. I combine my frontend and backend skills when deploying containerized applications to serverless architecture.',
        'This year I plan to focus my studies more on network security technologies such as cybersecurity architecture and network vulnerability testing/evaluation. I utilize libraries such as NumPy, TensorFlow, and Scikit-learn for creative Machine Learning projects.',
        'If you wish to contact me, you can reach me at camzarubiak@gmail.com. Have a lovely day :)'
      ],
      postDelay: 500
    }
  ];
    runScripts(data, 0);
  });
  
  runScripts = (data, pos) => {
      var prompt = $('.prompt'),
          script = data[pos];
      
      if(script.clear === true) {
        $('.history').html(''); 
      }

      switch(script.action) {
          case 'type':
            prompt.removeData();

            $('.typed-cursor').text('');
            
            prompt.typed({
              strings: script.strings,
              typeSpeed: 30,
              callback: () => {
                var history = $('.history').html();
                history = history ? [history] : [];
                history.push('$ ' + prompt.text());
                
                // If there is output, display it
                if (script.output) {
                  history.push(script.output);
                  prompt.html('');
                  $('.history').html(history.join('<br>'));
                }
                // Scroll to the bottom of the screen
                $('section.terminal').scrollTop($('section.terminal').height());
                
                // Run next script
                pos++;
                if(pos < data.length) {
                  setTimeout(() => {
                    runScripts(data, pos);
                  }, script.postDelay || 1000);
                }
              }
            });
            break;
          
          case 'view':
            break;
      }
  }
  
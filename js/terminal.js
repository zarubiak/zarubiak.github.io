$(async () => {
  let chessStatsObj = await fetchChessData();
  var data = [
    { 
      action: 'type',
      strings: ["npm install -g zasha^400"],
      output: '<span class="gray">+zasha@8.13.71 installed</span><br>&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['Welcome to my website! <span>&#10084;</span>'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['I\'m a Software Developer from Victoria, BC.'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['I enjoy writing scalable code for projects with a purpose.'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['I do frontend and backend work using Javascript and Python.'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['I enjoy deploying containerized applications to serverless architecture.'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['I also enjoy playing chess <span>&#9812;</span>'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: [`My current chess.com rapid rating is ${chessStatsObj.rapid_score}.`],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: [`I have ${chessStatsObj.rapid_wins} wins, ${chessStatsObj.rapid_loss} losses, and ${chessStatsObj.rapid_ties} ties.`],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['For any inquiries, email me at camzarubiak@gmail.com.'],
      output: '&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['Have a lovely day <span>&#10084;</span>'],
      postDelay: 1000
    },
  ];
    runScripts(data, 0);
  });

  fetchChessData = async (url = 'https://api.chess.com/pub/player/czurbz/stats') => {
    const response = await fetch(url);
    let stats = await response.json();
    
    let statsObj = {
      rapid_score: stats.chess_rapid.last.rating,
      rapid_wins: stats.chess_rapid.record.win,
      rapid_loss: stats.chess_rapid.record.loss,
      rapid_ties: stats.chess_rapid.record.draw,
    }

    return statsObj;
  }
  
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
  
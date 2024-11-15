
import request from 'request';
import * as cheerio from 'cheerio';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';


const array = [{}];
const narray = [{}];
const mpop = [{}];
const hollywood = [{}];

const url = 'https://moviesflixz.co.in/'; 
fetch(url)
  .then(response => response.text())
  .then(html => {
  


    const $ = cheerio.load(html);
    const a = $('.ct-media-container').each((i , el)=>{
      const title = $(el).attr('aria-label');
      const link = $(el).attr('href');
      const img = $(el).find('img').attr('src');
      const video = {
            "title":title,
            "img":img,
             "link":link
            };
            array[i] = video;
    })

    // console.log(array);
    


  })
  .catch(error => {
    console.error('Error fetching or parsing the HTML:', error);
  });

  const mprl = `https://moviesflixz.co.in/category/moviesflix-bollywood-movies/`; 
    fetch(mprl)
      .then(response => response.text())
      .then(html => {
      
        const $ = cheerio.load(html);
        const a = $('.ct-media-container').each((i , el)=>{
          const title = $(el).attr('aria-label');
          const link = $(el).attr('href');
          const img = $(el).find('img').attr('src');
          const video = {
                "title":title,
                "img":img,
                 "link":link
                };
                mpop[i] = video;
        })
    
        // console.log(mpop);
        
    
    
      })
      .catch(error => {
        console.error('Error fetching or parsing the HTML:', error);
      });


      const hlwd = `https://moviesflixz.co.in/category/moviesflix-hollywood-movies/`; 
      fetch(hlwd)
        .then(response => response.text())
        .then(html => {
        
          const $ = cheerio.load(html);
          const a = $('.ct-media-container').each((i , el)=>{
            const title = $(el).attr('aria-label');
            const link = $(el).attr('href');
            const img = $(el).find('img').attr('src');
            const video = {
                  "title":title,
                  "img":img,
                   "link":link
                  };
                  hollywood[i] = video;
          })
      
          // console.log(hollywood);
          
      
      
        })
        .catch(error => {
          console.error('Error fetching or parsing the HTML:', error);
        });      
  


        const ltst = `https://moviesflixz.co.in/?s=latest&ct_post_type=post%3Apage`;
        fetch(ltst)
          .then(response => response.text())
          .then(html => {
          
            const $ = cheerio.load(html);
            const a = $('.ct-media-container').each((i , el)=>{
              const title = $(el).attr('aria-label');
              const link = $(el).attr('href');
              const img = $(el).find('img').attr('src');
              const video = {
                    "title":title,
                    "img":img,
                     "link":link
                    };
                    latest[i] = video;
            })
        
            // console.log(latest);
            
        
        
          })
          .catch(error => {
            console.error('Error fetching or parsing the HTML:', error);
          });
          
          
const app = express();
app.use(cors());
const port = 9000;

app.get('/' , (req , res)=>{
  return (res.json(array))
  })
app.get('/mpop',(req,res)=>{
  return (res.json(mpop))
   })
app.get('/hollywood' , (req , res)=>{
  return (res.json(hollywood))
})
app.get('/latest' , (req , res)=>{
  return (res.json(latest));
})

app.get('/search/:id',(req,res)=>{
  const search = req.params.id;
  console.log(search);
  const allarray = [{}];

  

  const allrl = `https://moviesflixz.co.in/?s=${search}&ct_post_type=post%3Apage`; 
fetch(allrl)
.then(response => response.text())
.then(html => {

  const $ = cheerio.load(html);
  const a = $('.ct-media-container').each((i , el)=>{
    const title = $(el).attr('aria-label');
    const link = $(el).attr('href');
    const img = $(el).find('img').attr('src');
    const video = {
          "title":title,
          "img":img,
           "link":link
          };
          allarray[i] = video;
  })

  console.log(allarray);
  console.log(search);
  return (res.json(allarray))


  })
  .catch(error => {
  console.error('Error fetching or parsing the HTML:', error);
  });
 })

    app.listen(port , ()=>{
    console.log('listening');
  });






  





  

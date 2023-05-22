const Discord = require('discord.js');
const YAML = require('yaml');
const fs = require('fs');

module.exports = {
    name: "anime",
    description: "Quiz - Anime!",
    usage: "anime",
    aliases: ["t-anime", "qanime", "qa", "q-a"],
    execute(message, args, client, prefix, userColor) {
        
            // Get question and answers
        
            const questions = YAML.parse(fs.readFileSync('./xconfig/anime.yml', 'utf-8')).questions;
            const n = Math.floor(Math.random() * questions.length);
            const question = questions[n].question;
            const answers = questions[n].answers;
            const origAnswers = [...answers].map(a => `\`${a}\``);
            // Clean answers
            for (let i = 0; i < answers.length; i++) {
            answers[i] = answers[i].trim().toLowerCase().replace(/\.|'|-|\s/g, '');
            }

            // Get user answer
            const questionEmbed = new Discord.MessageEmbed()
            .setTitle(`Anime - Quizz`)
            .addField(`Question`, `${question}`)
            .setFooter(`Induced by: ${message.author.tag}`, message.author.avatarURL({dynamic : true}))
            .setTimestamp()
            .setColor(userColor);
                const url = question.match(/\bhttps?:\/\/\S+/gi);
                if (url) questionEmbed.setImage(url[0]);
                message.channel.send({embeds: [questionEmbed]});
                let winner;
                const filter = msg => !msg.author.bot && msg.author.id === message.author.id 
                const collector = message.channel.createMessageCollector({filter, time: 15000 }); // Wait 15 seconds
                collector.on('collect', msg => {
                if (answers.includes(msg.content.trim().toLowerCase().replace(/\.|'|-|\s/g, ''))) {
                    winner = msg.author;
                    collector.stop();
                }
                });
            collector.on('end', () => {
            const answerEmbed = new Discord.MessageEmbed()
                .setTitle(`Anime - Quizz`)
                .setFooter(`Induced by: ${message.author.tag}`, message.author.avatarURL({dynamic : true}))
                .setTimestamp()
                .setColor(userColor);
            if (winner) 
                message.channel.send({embeds: [answerEmbed.setDescription(`Congratulations ${winner.toString()}, you have given the correct answer!`)]});
            else message.channel.send({embeds: [answerEmbed
                .setDescription(`I'm sorry, time is up! Good luck next time ;>`)
                .addField(`Correct Answers`, origAnswers.join('\n'))]}
            );
            });
        }
    }
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cireneirbo_gazette.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JokeController : Controller
	{
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<JokeController> _logger;

        public JokeController(ILogger<JokeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Joke> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Joke
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}

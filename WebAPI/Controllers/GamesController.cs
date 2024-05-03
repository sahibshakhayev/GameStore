using SahibGameStore.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using SahibGameStore.Application.Interfaces;
using System.Collections.Generic;
using SahibGameStore.WebAPI.Filters;
using SahibGameStore.Application.DTOS.Games;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Http.Headers;
using SahibGameStore.Domain.ValueObjects;

namespace SahibGameStore.WebAPI.Controllers
{
    [ValidateModel]
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        private IGameServices _services;
        private IWebHostEnvironment _hostingEnvironment;
        public GamesController(IGameServices services, IWebHostEnvironment hostingEnvironment)
        {
            _services = services;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<PaginatedList<GameListViewModel>> Get(int page_index, int page_size, string? search)
        {
            if (page_index <= 0)
            {
                page_index = 1;
            }

            if (page_size <= 0)
            {
                page_size = 1;
            }


            return await _services.GetAllGamesPaginated(page_index, page_size, search != null && search != String.Empty ? search : "");
        }

        [HttpGet("listbygenre/{genreId}")]
        public async Task<IEnumerable<GameListViewModel>> GetListByGenre(Guid genreId)
        {
            return await _services.GetGamesByGenre(genreId);
        }

        [HttpGet("{id}")]
        public async Task<GameViewModel> Get(Guid id)
        {
            return await _services.GetGameById(id);
        }

        [HttpGet("bestrated")]
        public async Task<IEnumerable<GameListViewModel>> GetBestRatedGames()
        {
            return await _services.GetBestRatedGames();
        }

        [HttpGet("bestsellers")]
        public async Task<IEnumerable<GameListViewModel>> GetBestSellerGames()
        {
            return await _services.GetBestSellerGames();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public ActionResult Post([FromBody]AddOrUpdateGameDTO game)
        {
            var id = _services.InsertGame(game);
            if (id != null)
            {
                return new OkObjectResult(new ResultViewModel(id, 200, "Success!"));
            }
            else
            {
                return new BadRequestObjectResult(new ResultViewModel(500, "Something went wrong! Try again later."));
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public void Update([FromBody]AddOrUpdateGameDTO game)
        {
            _services.UpdateGame(game);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _services.DeleteGame(id);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/uploadthumbimage")]
        public async Task<ActionResult> UploadThumbImage(Guid id)
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "images/games/" + id + "/thumb";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    await _services.UpdateThumbImage(id, "/" + folderName + "/" + fileName);
                }
                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("overview")]
        public async Task<ActionResult> Overview([FromBody]AddOrUpdateGameOverviewDTO model)
        {
            try
            {
                await _services.AddOrUpdateOverview(model);
                return new OkObjectResult(new ResultViewModel(model.GameId, 200, "Success!"));
            }
            catch (Exception)
            {
                return new BadRequestObjectResult(new ResultViewModel(500, "Something went wrong! Try again later."));
            }
        }

        [HttpGet("{id}/overview")]
        public async Task<dynamic> GetOverview(Guid id)
        {
            return await _services.GetOverview(id);
        }
    }
}
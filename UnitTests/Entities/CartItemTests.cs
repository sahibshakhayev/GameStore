using System.Linq;
using SahibGameStore.Domain.Entities;
using SahibGameStore.UnitTests.Repositories;
using Xunit;

namespace SahibGameStore.UnitTests.Entities
{
    public class CartItemTests
    {
        private FakeGameRepository _repository;

        public CartItemTests()
        {
            
            _repository = new FakeGameRepository();
        }

        [Fact]
        public void ShouldReturnErrorWhenProducIsNull()
        {
            CartItem fakeCartItem = new CartItem(null, 1);
            Assert.Equal(false, fakeCartItem.IsValid);
        }

        [Fact]
        public void ShouldReturnErrorWhenQuantityIsBelowZero()
        {
            Game fakeProduct = _repository._entities.FirstOrDefault();
            CartItem fakeCartItem = new CartItem(fakeProduct, -1);
            Assert.Equal(false, fakeCartItem.IsValid);
        }

        [Fact]
        public void ShouldReturnSuccessWhenBuildingAnValidCartItem() {
            Game fakeProduct = _repository._entities.FirstOrDefault();
            CartItem fakeCartItem = new CartItem(fakeProduct, 1);
            Assert.Equal(true, fakeCartItem.IsValid);
        }
    }
}

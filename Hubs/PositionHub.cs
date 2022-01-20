using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRSampleOne.Hubs
{
    public class PositionHub : Hub
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="l"></param>
        /// <param name="t"></param>
        /// <returns></returns>
        public async Task SendPosition(int l, int t)
        {
            await Clients.Others.SendAsync("GetPosition", l, t);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Probst.AspNetCore.Nats;
using messageBoardApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MessageBoardContext>(opt =>
  opt.UseNpgsql(builder.Configuration.GetConnectionString("MessagesContext"))
);
builder.Services.AddNats(opt =>
{
  opt.Url = builder.Configuration["Nats:Url"];
});
var myOrigins = "_myAllowOrigins";
builder.Services.AddCors(opt => {
  opt.AddPolicy(name: myOrigins,
    builder =>
    {
        builder.WithOrigins("http://localhost")
          .AllowAnyMethod()
          .AllowAnyHeader();
    });
});

var app = builder.Build();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(myOrigins);

var context = app.Services.GetRequiredService<MessageBoardContext>();
context.Database.EnsureCreated();
context.SaveChanges();

app.Run();

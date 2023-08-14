using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class IdBaseFix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "Isbn",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "PublishedDate",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "IdBase");

            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "IdBase");

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Isbn = table.Column<string>(type: "text", nullable: false),
                    PublishedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_IdBase_Id",
                        column: x => x.Id,
                        principalTable: "IdBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    UserRole = table.Column<int>(type: "integer", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    PasswordSalt = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_IdBase_Id",
                        column: x => x.Id,
                        principalTable: "IdBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.AddColumn<Guid>(
                name: "AuthorId",
                table: "IdBase",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "IdBase",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Isbn",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordSalt",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishedDate",
                table: "IdBase",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "IdBase",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "IdBase",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserRole",
                table: "IdBase",
                type: "integer",
                nullable: true);
        }
    }
}

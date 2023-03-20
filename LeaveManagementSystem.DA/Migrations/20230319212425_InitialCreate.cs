using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveManagementSystem.DA.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Document_Leaves_LeaveId",
                table: "Document");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveSchedule_Leaves_LeaveId",
                table: "LeaveSchedule");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveSchedule",
                table: "LeaveSchedule");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Document",
                table: "Document");

            migrationBuilder.DropColumn(
                name: "Client",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "LeaveSchedule",
                newName: "LeaveSchedules");

            migrationBuilder.RenameTable(
                name: "Document",
                newName: "Documents");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveSchedule_LeaveId",
                table: "LeaveSchedules",
                newName: "IX_LeaveSchedules_LeaveId");

            migrationBuilder.RenameIndex(
                name: "IX_Document_LeaveId",
                table: "Documents",
                newName: "IX_Documents_LeaveId");

            migrationBuilder.AddColumn<DateTime>(
                name: "WorkStartDate",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveSchedules",
                table: "LeaveSchedules",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Documents",
                table: "Documents",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_UserId",
                table: "Leaves",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Leaves_LeaveId",
                table: "Documents",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Users_UserId",
                table: "Leaves",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveSchedules_Leaves_LeaveId",
                table: "LeaveSchedules",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Leaves_LeaveId",
                table: "Documents");

            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Users_UserId",
                table: "Leaves");

            migrationBuilder.DropForeignKey(
                name: "FK_LeaveSchedules_Leaves_LeaveId",
                table: "LeaveSchedules");

            migrationBuilder.DropIndex(
                name: "IX_Leaves_UserId",
                table: "Leaves");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LeaveSchedules",
                table: "LeaveSchedules");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Documents",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "WorkStartDate",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "LeaveSchedules",
                newName: "LeaveSchedule");

            migrationBuilder.RenameTable(
                name: "Documents",
                newName: "Document");

            migrationBuilder.RenameIndex(
                name: "IX_LeaveSchedules_LeaveId",
                table: "LeaveSchedule",
                newName: "IX_LeaveSchedule_LeaveId");

            migrationBuilder.RenameIndex(
                name: "IX_Documents_LeaveId",
                table: "Document",
                newName: "IX_Document_LeaveId");

            migrationBuilder.AddColumn<string>(
                name: "Client",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LeaveSchedule",
                table: "LeaveSchedule",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Document",
                table: "Document",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Document_Leaves_LeaveId",
                table: "Document",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveSchedule_Leaves_LeaveId",
                table: "LeaveSchedule",
                column: "LeaveId",
                principalTable: "Leaves",
                principalColumn: "Id");
        }
    }
}
